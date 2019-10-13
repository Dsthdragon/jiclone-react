import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAd } from '../../actions/ads';
import { getAdImages, uploadAdImages, deleteAdImage, mainAdImage } from '../../actions/ad_images';
import { ADS_MEDIA_URL, MAX_MEDIA_IMAGES } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MyAd extends Component {

    state = {
        ad:null,
        ad_images:null,
        loading: false,
        ad_images_count: 0,
        active_image: {
            id:0,
            image:null
        },
    }

    componentDidMount()
    {
        let id = this.props.match.params.id;
        this.props.dispatch(getAd(id))
        this.props.dispatch(getAdImages(id))
    }

    componentWillUnmount()
    {
        document.querySelector("#full-modal").remove()
    }

    componentDidUpdate(prevProps)
    {
        if(this.props.ad !== prevProps.ad)
        {
            let ad = this.props.ad.single.ad
            if(ad){
                if(ad.client.id === this.props.user.auth.client.id)
                {
                    this.setState({
                        ad
                    })
                } else {
                    this.props.history.push('/profile')
                }
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
            let uploadedImage = this.props.ad_image.upload
            if(uploadedImage && prevProps.ad_image.upload !== uploadedImage){
                if(uploadedImage.status === 'success')
                {
                    let images = this.state.ad_images
                    images.push(uploadedImage.ad_image)
                    let ad_images_count = images.length
                    this.setState({
                        ad_images: images,
                        ad_images_count,
                        loading: false
                    })
                } else {
                    this.setState({
                        loading: false
                    })
                }
            }
            let deletedImage = this.props.ad_image.delete
            if(deletedImage && prevProps.ad_image.delete !== deletedImage){
                if(deletedImage.status === 'success')
                {
                    this.props.dispatch(getAdImages(this.state.ad.id))
                }
            }
            let mainImage = this.props.ad_image.main
            if(mainImage && prevProps.ad_image.main !== mainImage){
                if(mainImage.status === 'success')
                {
                    this.props.dispatch(getAd(this.state.ad.id))
                    this.props.dispatch(getAdImages(this.state.ad.id))
                }
            }
        }
    }

    startUpload = (e) => {
        this.refs.uploadFile.click()
    }
    

    uploadImage = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })

        let reader = new FileReader();
        let file = e.target.files[0]
        let ext = file.name.split('.')
        ext = ext[ext.length-1]

        reader.onloadend = () => {
            let img = reader.result.split(',', 2)
            const data = {
                ad: this.state.ad.id,
                type: ext,
                img: img[1]
            }
            this.props.dispatch(uploadAdImages(data))
        }
        reader.readAsDataURL(file)
    }

    deleteAdImage = () => {
        let data = {
            client: this.state.ad.client.id,
            ad: this.state.ad.id,
            image: this.state.active_image.id
        }
        this.props.dispatch(deleteAdImage(data))
    }
    
    mainAdImage = () => {
        let data = {
            client: this.state.ad.client.id,
            ad: this.state.ad.id,
            image: this.state.active_image.id
        }
        this.props.dispatch(mainAdImage(data))
    }

    adImagesList = () => {
        let ad_images = this.state.ad_images;
        if(ad_images){
            return (
                ad_images.map((item,i) =>(
                    <div key={i}>
                        <div className="uk-inline uk-inline-clip uk-transition-toggle">
                            <img onLoadStart={this.fixImageHeight} src={ADS_MEDIA_URL + item.image} alt={item.image} style={{ objectFit: 'cover', width:'150px', height:'150px' }} />
                            <span onClick={(e) => this.setActive(item)} href="#full-modal" uk-toggle="">
                            <div className="uk-transition-fade uk-position-cover uk-overlay uk-overlay-primary uk-flex uk-flex-center uk-flex-middle pointer">
                                <span uk-overlay-icon=""></span>
                            </div>
                            </span>
                        </div>
                    </div>
                ))
            )
        }
    }

    adImagePopUp = () => (
        <div id="full-modal" className="uk-flex-top" uk-modal="">
            <div className="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
                <button className="uk-modal-close-outside" type="button" uk-close=""></button>
                <img src={`${ADS_MEDIA_URL + this.state.active_image.image}`} alt={this.state.active_image.image} uk-img="" />
                {console.log(this.state.active_image)}
                <div className="uk-padding-small uk-text-center">
                    <div className="uk-child-width-1-3@s uk-grid-small" uk-grid="">
                        <div>
                            <button className="uk-button uk-button-primary uk-modal-close" onClick={this.mainAdImage}>
                                MAKE MAIN
                            </button>
                        </div>
                        <div>
                            <button className="uk-button uk-button-danger uk-modal-close" onClick={this.deleteAdImage}>
                                DELETE
                            </button>
                        </div>
                        <div>
                            <button className="uk-button uk-button-secondary uk-modal-close">
                                CLOSE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    setActive = (item) => {
        let active_image = this.state.active_image;
        active_image.image = item.image;
        active_image.id = item.id
        this.setState({
            active_image
        })
    }

    adView = () => {
        let ad = this.state.ad;
        if(ad){
            return (
                <div>
                    {this.adImagePopUp()}
                    
                    <div className="uk-float-right">
                        <Link to={`/my-ad/${ad.id}/edit`} className="uk-button uk-button-primary uk-margin-small-right">
                            <FontAwesomeIcon icon="edit"/>
                        </Link>
                        <Link to={`/profile`} className="uk-button uk-button-secondary">
                            <FontAwesomeIcon icon="backward"/>
                        </Link>
                    </div>
                    <h3>Title: {ad.title}</h3>
                    <hr />
                    <div uk-grid="">
                        <div className="uk-width-1-1 uk-width-1-4@m">
                            <div className="uk-text-center">
                                <img src={ad.default_image? ADS_MEDIA_URL + ad.default_image.image : "/images/camera.png"} alt="Cover" width="150" />
                                <div>
                                    <hr />
                                </div>
                                <div className="uk-child-width-1-2 uk-grid-collapse" uk-grid="">
                                    {this.adImagesList()}
                                    {
                                        this.state.ad_images_count < MAX_MEDIA_IMAGES?
                                            <div>
                                                <div className="uk-inline" style={{width: '150px', height:'150px', cursor: 'pointer'}}>
                                                    {
                                                        !this.state.loading ?
                                                            <div className="uk-icon-button uk-position-center" style={{width: "50px", height: "50px"}} onClick={this.startUpload}>
                                                                <FontAwesomeIcon icon="plus"  />
                                                                <input type="file"  onChange={this.uploadImage.bind(this)} ref="uploadFile"
                                                                id="uploadImage" style={{display:'none'}}  />
                                                            </div>
                                                        : <div>
                                                            <div className="uk-overlay-primary uk-position-cover">
                                                                <div className="uk-position-center uk-spinner uk-icon" uk-spinner="ratio: 1"></div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        : null
                                    }
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div className="uk-width-1-1 uk-width-3-4@m">
                            <div className="uk-card uk-card-default">
                                <div className="uk-card-body">
                                    <h4><b>Overview:</b></h4>
                                    <hr />
                                    <div className="uk-child-width-1-1 uk-child-width-1-2@m" uk-grid="">
                                        <div>
                                            <b>Category: </b> {ad.category.title}
                                        </div>
                                        <div>
                                            <b>Region: </b> {ad.region.title}
                                        </div>
                                        <div>
                                            <b>Place: </b> {ad.place.title}
                                        </div>
                                        <div>
                                            <b>Price: </b> {
                                                ad.open ?
                                                    "Contact For Price"
                                                :   ad.negotiable ?
                                                    `NGN ${ad.price} - Negotiable`
                                                :   `NGN ${ad.price}`
                                            }
                                        </div>
                                        <div className="uk-width-1-1">
                                            <b>Address: </b> {ad.address}
                                        </div>
                                        <div className="uk-width-1-1">
                                            <b>Summary: </b> {ad.summary}
                                        </div>
                                    </div>
                                    <h5><b>Description:</b></h5>
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
                    </div>
                </div>
            )
        }
    }

    render(){
        return (
            <div className="uk-container">
                {this.adView()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        ad: state.ad,
        user: state.user,
        ad_image: state.ad_image
    }
}
export default connect(mapStateToProps)(MyAd)