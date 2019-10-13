import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findAds } from '../../actions/ads';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import Grid from '../../components/Ads/grid';

import { PER_PAGE } from '../../config';

class search extends Component {

    
    state = {
        ads: [],
        category: null,
        has_next: false,
        id: this.props.match.params.id,
        title: this.props.match.params.title,
        current_page: parseInt(new URLSearchParams(this.props.location.search).get('page')) || 1,
        total: 0,
        per_page: parseInt(new URLSearchParams(this.props.location.search).get('per_page')) ||PER_PAGE,
        order_by: new URLSearchParams(this.props.location.search).get('order_by') ||'title',
        order: new URLSearchParams(this.props.location.search).get('order') ||'desc',
    }

    componentDidMount(){
        let params = new URLSearchParams(this.props.location.search)
        params.set('per_page', this.state.per_page);
        this.props.dispatch(findAds(params.toString()))
    }

    componentDidUpdate(prevProps)
    {
        if(prevProps !== this.props)
        {
            if(this.props.ad !== prevProps.ad)
            {
                let ads = this.props.ad.list.ads;
                let has_next = this.props.ad.list.has_next;
                let total = this.props.ad.list.total;
                if(ads)
                {
                    let current_page = parseInt(new URLSearchParams(this.props.location.search).get('page')) || 1;
                    let per_page = parseInt(new URLSearchParams(this.props.location.search).get('per_page')) || this.state.per_page;
                    let order = new URLSearchParams(this.props.location.search).get('order') || this.state.order
                    let order_by = new URLSearchParams(this.props.location.search).get('order_by') || this.state.order_by
                    this.setState({
                        ads,
                        has_next,
                        current_page,
                        total,
                        per_page,
                        order,
                        order_by
                    })
                }
            }
            if(this.props.location.search !== prevProps.location.search){
                console.log(this.props.location.search);
                this.props.dispatch(findAds(this.props.location.search))
            }
        }
    }

    changePage = (new_page) => {
        const params = new URLSearchParams(this.props.location.search)
        params.set('page', new_page);
        params.set('per_page', this.state.per_page);
        this.props.history.push(`/search?${params.toString()}`)
    }

    changeOrder = (e) => {
        const params = new URLSearchParams(this.props.location.search)
        params.set('order', e.target.value);
        this.props.history.push(`/search?${params.toString()}`)
    }

    changeOrderBy = (e) => {
        const params = new URLSearchParams(this.props.location.search)
        params.set('order_by', e.target.value);
        this.props.history.push(`/search?${params.toString()}`)
    }

    changePerPage = (e) => {
        const params = new URLSearchParams(this.props.location.search)
        params.set('per_page', e.target.value);
        this.props.history.push(`/search?${params.toString()}`)
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
                                        <button className="uk-button uk-button-primary" onClick={() => this.changePage(this.state.current_page - 1)}>
                                            <FontAwesomeIcon icon="arrow-left" />
                                        </button>
                                    </div>
                                : null
                            }
                        </div>
                        <div className="uk-text-right">
                            {
                                this.state.has_next ?
                                <div>
                                        <button 
                                        className="uk-button uk-button-primary" onClick={() => this.changePage(this.state.current_page + 1)}>
                                            <FontAwesomeIcon icon="arrow-right" />
                                        </button>
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
                <Grid item={item} show_category={true} key={i} />
            ))
        : null
    )

    render() {
        return (
            <div className="uk-container uk-margin-top">
                <div className="">
                    <div className="">
                        <div className="uk-float-right">
                            <div uk-grid="" className="uk-grid-small uk-text-right">
                                <div>
                                    <select className="uk-select" defaultValue={this.state.order_by} onChange={this.changeOrderBy}>
                                        <option value="title">Title</option>
                                        <option value="views">Views</option>
                                        <option value="created">Created</option>
                                    </select>
                                </div>
                                <div>
                                    <select className="uk-select" defaultValue={this.state.order} onChange={this.changeOrder}>
                                        <option value="asc">ASC</option>
                                        <option value="desc">DESC</option>
                                    </select>
                                </div>
                                <div>
                                    <select className="uk-select" defaultValue={this.state.per_page} onChange={this.changePerPage}>
                                        <option value="8">8</option>
                                        <option value="12">12</option>
                                        <option value="16">16</option>
                                        <option value="20">20</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <h4 className="uk-card-title uk-text-bold uk-margin-remove-top"><span className="uk-text-primary">{this.state.total}</span> -  RESULTS FOUND</h4>
                        <hr />
                    </div>
                    <div uk-grid="">
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
)(search);