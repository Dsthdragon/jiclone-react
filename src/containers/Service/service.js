import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAd } from '../../actions/ads';
import { getAdImages } from '../../actions/ad_images';
import { checkReview, createReview, serviceReviews } from '../../actions/review';
import { ADS_MEDIA_URL, MEDIA_URL  } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { displayStars } from '../../hoc/utils';



class Service extends Component {

    state = {
        ad:null,
        ad_images:null,
        loading: false,
        ad_images_count: 0,
        active_image: {
            id:0,
            image:null
        },
        Review_Ad: {
            rating: {
                title: 'star_rating',
                value: 5,
            },
            review: {
                title: 'textarea_review',
                value: null
            }
        },
        can_review: false,
        logged_in: this.props.user.auth.isAuth && this.props.user.auth.client,
        create_review: {
            style: null,
            message: null
        },
        reviews: [],
        review_total: 0,
        review_has_next: false,
        review_refresh: true,
        review_page: 1
    }

    componentDidMount()
    {
        let id = this.props.match.params.id;
        this.props.dispatch(getAd(id, 1))
        this.props.dispatch(serviceReviews(id, this.review_page))
        this.props.dispatch(getAdImages(id))
        if (this.props.user.auth.isAuth && this.props.user.auth.client)
        {
            this.props.dispatch(checkReview({client: this.props.user.auth.client.id, ad: id}))
        }
    }

    componentDidUpdate(prevProps)
    {
        if(this.props.ad !== prevProps.ad)
        {
            let ad = this.props.ad.single.ad
            if(ad){
                this.setState({
                    ad
                })
            } else {
                this.props.history.push('/')
            }
        }

        if(this.props.ad_image !== prevProps.ad_image){
            let ad_images = this.props.ad_image.list.ad_images;
            if(ad_images){
                let ad_images_count = ad_images.length
                this.setState({
                    ad_images,
                    ad_images_count
                })
            }
        }

        if(this.props.review !== prevProps.review){
            
            if(this.props.review.check !== prevProps.review.check)
            {
                this.setState({
                    can_review: this.props.review.check && this.props.review.check.status === 'success'
                })
            }

            if(this.props.review.create !== prevProps.review.create)
            {

                if(this.props.review.create.status === 'success')
                {
                    this.props.dispatch(checkReview({client: this.props.user.auth.client.id, ad: this.props.match.params.id}))
                } else {
                    this.setState({
                        create_review: {
                            style: this.props.review.create.status === 'success' ? 'uk-alert uk-alert-success' : 'uk-alert uk-alert-danger',
                            message: this.props.review.create.message
                        }
                    })
                }
            }

            if(this.props.review.list !== prevProps.review.list)
            {
                if(this.props.review.list.status === 'success'){
                    let list = this.props.review.list;
                    let reviews;
                    let review_has_next = list.has_next;
                    let review_total = list.total;
                    if(this.state.review_refresh)
                    {
                        reviews = list.reviews
                    } else {
                        reviews = [...this.state.reviews, ...list.reviews]
                    }
                    let review_refresh = false
                    let review_page = this.state.review_page + 1

                    this.setState({
                        reviews,
                        review_has_next,
                        review_total,
                        review_refresh,
                        review_page
                    })
                }
            }
        }
    }

    startUpload = (e) => {
        this.refs.uploadFile.click()
    }

    adImagesList = () => {
        let ad_images = this.state.ad_images;
        if(ad_images){
            return (
                ad_images.map((item,i) =>(
                    <li key={i}>
                        <div className="uk-panel">
                            <a href={ADS_MEDIA_URL+item.image}>
                                <div className="divImageBox"
                                    style={{
                                        background: `url('${ADS_MEDIA_URL}${item.image}')`
                                    }}
                                    >
                                        <div>

                                        </div>
                                </div>
                            </a>
                        </div>
                    </li>
                ))
            )
        }
    }

    setActive = (item) => {
        let active_image = this.state.active_image;
        active_image.image = item.image;
        active_image.id = item.id
        this.setState({
            active_image
        })
    }

    adSlider = (ad) => {
        if(ad) {
            return (
                <div className="uk-container">
                    <h1 className="uk-text-center">
                        Photo Gallery
                    </h1>
                    <div className="uk-padding-small" uk-slider="">
                        <ul className="uk-slider-items uk-child-width-1-4@m uk-grid" uk-lightbox="animation: slide">
                            <li>
                                <div className="uk-panel">
                                    <a href={ADS_MEDIA_URL+ad.default_image.image}>
                                        <div className="divImageBox"
                                            style={{
                                                background: `url('${ADS_MEDIA_URL}${ad.default_image.image}')`
                                            }}
                                            >
                                                <div>

                                                </div>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            {this.adImagesList()}
                        </ul>
                        <div uk-grid="" className="uk-grid-small">
                            <div className="uk-width-1-2">
                                <button className="uk-button uk-button-default" uk-slider-item="previous">
                                    <FontAwesomeIcon icon="angle-left" />
                                </button>
                            </div>
                            <div className="uk-width-1-2 uk-text-right">
                                <button className="uk-button uk-button-default" uk-slider-item="next">
                                    <FontAwesomeIcon icon="angle-right" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    adProperty = (ad) => {
        if(ad) {
            return (
                <div className="uk-container uk-padding">
                    <div uk-grid="" className="uk-child-width-1-1 uk-child-width-1-4@m uk-text-center">
                        <div>
                            <div className="uk-padding">
                                <FontAwesomeIcon size="4x" icon="phone" />
                            </div>
                            <p>
                                Phone Number
                            </p>
                            {ad.phone}
                        </div>
                        <div>
                            <div className="uk-padding">
                                <FontAwesomeIcon size="4x" icon="money-bill" />
                            </div>
                            <p>Pricing</p>
                            {
                            ad.open ?
                                "Contact For Price"
                            :   ad.negotiable ?
                                `NGN ${ad.price} <br /> Negotiable`
                            :   `NGN ${ad.price}`
                        }
                        </div>
                        <div>
                            <div className="uk-padding">
                                <FontAwesomeIcon size="4x" icon="map-marker-alt" />
                            </div>
                            <p>Address</p>
                            {
                                ad.address ?
                                    `${ad.address}, `
                                : null
                            } {ad.place.title}, {ad.region.title}
                        </div>
                        <div>
                            <div className="uk-padding">
                                <FontAwesomeIcon size="4x" icon="eye" />
                            </div>
                            <p>Views</p>
                            {ad.views}
                        </div>
                    </div>
                </div>
            )
        }
    }

    adView = (ad) => {
        if(ad){
            return (
                <div className="uk-container">
                    <div uk-grid="" className="">
                        <div className="uk-width-1-1 uk-width-1-3@m">
                            <div className="uk-card uk-card-default">
                                <div className="uk-card-body uk-card-small uk-text-center">
                                    <div className="divImageBox"
                                        style={{
                                            background: `url('${ADS_MEDIA_URL}${ad.default_image.image}')`
                                        }}
                                        >
                                            <div className="uk-inline-clip">
                                                <div className="uk-position-bottom  uk-overlay ">
                                                    {displayStars(ad.rating)}
                                                </div>
                                            </div>
                                    </div>
                                    <div className="uk-margin-top">
                                        <h4>
                                            {ad.client.first_name} {ad.client.last_name}
                                        </h4>
                                        <hr />
                                        <a href="#makeReview" className="uk-button uk-button-primary green" uk-scroll="">
                                            Make A Review
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="uk-width-1-1 uk-width-2-3@m">
                            <h3>{ad.title}</h3>
                            <i>{ad.summary}</i>
                            <div>
                            <b>Categories: </b>
                                <Link to={`/category/${ad.category.id}/${ad.category.title}`} className="no-decoration" >
                                    <span>
                                        {ad.category.title}
                                    </span>
                                </Link>
                            </div>
                            <hr />
                            <div
                                dangerouslySetInnerHTML={{
                                    __html:ad.description
                                }}
                            >
                            </div>
                        </div>
                    </div>
                </div>
                    
            )
        }
    }

    selectRatingChange = (e) => {
        let Review_Ad = this.state.Review_Ad
        Review_Ad.rating.value = e.target.value;
        this.setState({
            Review_Ad
        })
    }

    postReview = () => {
        let Review_Ad = this.state.Review_Ad
        let data = {
            ad: this.props.match.params.id,
            client: this.props.user.auth.client.id,
            rating: Review_Ad.rating.value,
            review: Review_Ad.review.value
        }
        this.setState({
            review_refresh: true,
            review_page: 1
        })
        this.props.dispatch(createReview(data))
    }

    textareaReviewChange = (e) => {
        let Review_Ad = this.state.Review_Ad
        Review_Ad.review.value = e.target.value;
        this.setState({
            Review_Ad
        })
    }

    createReview = () => (
        this.state.logged_in ?
            this.state.can_review ?
                <div className="uk-grid-small" style={{fontSize: 24}} uk-grid="">
                    {
                        <div className="uk-width-1-1">
                            <p className={this.state.create_review.style}>
                                {this.state.create_review.message}
                            </p>
                        </div>
                    }

                    <div className="uk-width-1-2">
                        Evaluate Provider<span className="red-text">*</span>
                    </div>
                    <div className="uk-width-1-2 uk-text-right">
                        <select name={this.state.Review_Ad.rating.title} className="uk-select" defaultValue={this.state.Review_Ad.rating.value} onChange={this.selectRatingChange}>
                            <option value="5">
                                Excellent
                            </option>
                            <option value="4">
                                Good
                            </option>
                            <option value="3">
                                Average
                            </option>
                            <option value="2">
                                Poor
                            </option>
                            <option value="1">
                                Terrible
                            </option>
                        </select>
                    </div>
                    <div className="uk-width-1-1">
                        <p>
                            Write a detailed feedback<span className="red-text">*</span>
                        </p>
                        <textarea className="uk-textarea uk-width-1-1"  required="" rows="2" name={this.state.Review_Ad.review.title} onChange={this.textareaReviewChange}></textarea>
                    </div>
                    <div className="uk-width-1-1">
                        <button className="uk-button uk-button-primary uk-width-1-1" onClick={this.postReview}>
                            Post Review
                        </button>
                    </div>
                </div>
            :
            <div>
                <p className="uk-alert uk-alert-primary">
                    Reviewed
                </p>
            </div>
        :
            <div>
                <p className="uk-alert uk-alert-danger">
                    Must be logged in to review.
                </p>
            </div>
    )
    reviewItems = () => (
        this.state.reviews ? 
            this.state.reviews.map((item, i) => (
                <article className="uk-comment uk-comment-primary" key={i}>
                    <header className="uk-comment-header uk-grid-medium uk-flex-middle" uk-grid="">
                        <div className="uk-width-auto">
                            <img className="uk-comment-avatar" src={item.client.avatar ? MEDIA_URL + item.client.avatar : '/images/avatar.svg'} width="80" height="80" alt="" />
                        </div>
                        <div className="uk-width-expand">
                            {displayStars(item.rating)}
                            <h4 className="uk-comment-title uk-margin-remove">{item.client.last_name} {item.client.first_name}</h4>
                            <hr />
                            <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                <li>{item.created}</li>
                            </ul>
                        </div>
                    </header>
                    <div className="uk-comment-body">
                        <p>{item.review}</p>
                    </div>
                </article>
            ))
        : null
    )
    reviewList = () => (
        <div>
            <h3 className="uk-margin">
                <span className="blue-text">{this.state.review_total}</span> Reviews on "{this.state.ad ? this.state.ad.title : null}"
            </h3>
            <div>
                {this.reviewItems()}
            </div>
        </div>
    )

    adReviews = () => (
        <div className="uk-container">
            <h1 className="uk-text-center">Review</h1>
            <div className="uk-flex uk-flex-center" uk-grid="">
                <div className="uk-width-1-1 uk-width-2-3@m">
                    {this.createReview()}
                    {this.reviewList()}
                </div>
            </div>
        </div>
    )

    render(){
        let ad = this.state.ad;
        return (
            <div>
                <div className="uk-padding uk-padding-remove-horizontal">
                    {this.adView(ad)}
                </div>
                <div className="white uk-section">
                    {this.adSlider(ad)}
                </div>
                <div>
                    {this.adProperty(ad)}
                </div>
                <div className="white uk-section" id="makeReview">
                    {this.adReviews()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        ad: state.ad,
        user: state.user,
        ad_image: state.ad_image,
        review: state.review
    }
}
export default connect(mapStateToProps)(Service)