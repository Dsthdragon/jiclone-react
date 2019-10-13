import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategory } from '../../actions/category';
import { categoryAds } from '../../actions/ads';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import Grid from '../../components/Ads/grid';

class category extends Component {

    
    state = {
        ads: [],
        category: null,
        has_next: false,
        id: this.props.match.params.id,
        title: this.props.match.params.title,
        current_page: parseInt(new URLSearchParams(this.props.location.search).get('page')) || 1
    }

    componentDidMount(){

        this.props.dispatch(getCategory(this.state.id));
        this.props.dispatch(categoryAds(this.state.id, {limited:1, per_page: 1, page:this.state.current_page}))
    }

    componentDidUpdate(prevProps)
    {
        if(prevProps !== this.props)
        {
            if(this.props.category !== prevProps.category)
            {
                let category = this.props.category.single.category
                if(category)
                {
                    this.setState({
                        category
                    })
                }
            }
            if(this.props.ad !== prevProps.ad)
            {
                let ads = this.props.ad.list.ads;
                let has_next = this.props.ad.list.has_next;
                console.log(this.props.ad.list)
                if(ads)
                {
                    this.setState({
                        ads,
                        has_next
                    })
                }
            }
        }
    }

    changePage = (new_page) => {
        this.setState({current_page: new_page})
        this.props.dispatch(categoryAds(this.state.id, {limited:1, per_page: 1, page:new_page}))
    }


    paginate = () => (
        
        this.state.current_page > 1 || this.state.has_next ?
            <div className="uk-card uk-card-default uk-card-small uk-margin-top">
                <div className="uk-card-body">
                    <div className="uk-child-width-1-2" uk-grid="">
                        <div>
                            {
                                this.state.current_page > 1 ?
                                <div>
                                        <Link to={`/category/${this.state.id}/${this.state.title}?page=${this.state.current_page - 1}`} 
                                        className="uk-button uk-button-primary" onClick={() => this.changePage(this.state.current_page - 1)}>
                                            <FontAwesomeIcon icon="arrow-left" />
                                        </Link>
                                    </div>
                                : null
                            }
                        </div>
                        <div className="uk-text-right">
                            {
                                this.state.has_next ?
                                <div>
                                        <Link to={`/category/${this.state.id}/${this.state.title}?page=${this.state.current_page + 1}`} 
                                        className="uk-button uk-button-primary" onClick={() => this.changePage(this.state.current_page + 1)}>
                                            <FontAwesomeIcon icon="arrow-right" />
                                        </Link>
                                    </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        : null
    )

    displayAds = () => (
        this.state.ads && Array.isArray(this.state.ads) ?
        this.state.ads.map((item, i) => (
                <Grid item={item} show_category={false} key={i} />
            )) 
        : null
    )

    render() {
        console.log(this.state)
        return (
            <div className="uk-container uk-margin-top">
                <div className="uk-card uk-card-default">
                    <div className="uk-card-header">
                        <h4 className="uk-card-title">{this.state.title}</h4>
                    </div>
                    <div className="uk-card-body" uk-grid="">
                        {this.displayAds()}
                    </div>
                </div>
                {this.paginate()}
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        category:state.category,
        ad:state.ad
    };
}


export default connect(
    mapStateToProps,
)(category);