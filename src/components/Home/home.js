import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAds } from '../../actions/ads';
import Grid from '../Ads/grid';


class Home extends Component {

    state = {
        ads: []
    }

    componentDidMount()
    {
        this.props.dispatch(getAds({limited:1,per_page:12}))
    }

    componentDidUpdate(prevProps)
    {
        if(this.props.ad !== prevProps.ad)
        {
            let ads = this.props.ad.list
            if (ads) {
                if(ads.status === 'success') {
                    this.setState({
                        ads:ads.ads
                    })
                }
            }
        }
    }
    
    renderAds = () => (
        
        this.state.ads && Array.isArray(this.state.ads) ?
        this.state.ads.map((item, i) => (
                <Grid item={item} key={i} />
            )) 
        : null
    )

    render() {
        return (
            <div>
                <div className="uk-container uk-margin-top">
                    <div className="">
                        <div className="">
                            <h3 className="uk-card-title">
                                Recent Ads
                            </h3>
                            <hr />
                        </div>
                        <div className="">
                            <div uk-grid="" uk-height-match=".matchbox">
                                {this.renderAds()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        ad:state.ad
    }
}
export default connect(mapStateToProps)(Home)