import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clientAds } from '../../actions/ads';
import { ADS_MEDIA_URL } from '../../config';


class AdsList extends Component {
    
    state = {
        ads: [],
        nextPage: 1,
        hasNext: true,
        limit: 1
    }

    componentDidMount = () => {
        let client = this.props.user.auth.client
        this.props.dispatch(clientAds(client.id, this.state.limit, this.state.nextPage))
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.ad !== prevProps.ad){
            let ads = this.props.ad.list
            this.setState({
                ads:[...this.state.ads, ...ads.ads],
                nextPage: this.state.nextPage+1,
                hasNext: ads.has_next
            })
        }
    }

    loadMoreAds = () => {
        let client = this.props.user.auth.client
        this.props.dispatch(clientAds(client.id, this.state.limit, this.state.nextPage))
    }

    fillTable = () => (
        this.state.ads && Array.isArray(this.state.ads)?
            this.state.ads.map((item, i) => (
                <tr key={i}>
                    <td>
                        <img src={item.default_image? ADS_MEDIA_URL + item.default_image.image : "images/camera.png"} alt="Cover" width="50" />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.category.title}</td>
                    <td>
                        <Link to={`/my-ad/${item.id}`} className="uk-button uk-button-primary">
                            View
                        </Link>
                    </td>
                </tr>
            ))
        : null
    )

    AdsListTable = () => (
        <table className="uk-table uk-table-striped">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.fillTable()}
            </tbody>
        </table>
    )

    render() {
        return (
            <div>
                {this.AdsListTable()}
                {
                    this.state.hasNext ?
                        <div className="uk-text-center uk-margin">
                            <button className="uk-button uk-button-primary" type="button" onClick={this.loadMoreAds}>
                                Load More
                            </button>
                        </div>
                    : null
                }
            </div>
        )
    }

}


function mapStateToProps(state){
    return {
        user:state.user,
        client:state.client,
        ad:state.ad
    }
}
export default connect(mapStateToProps)(AdsList)