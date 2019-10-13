import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import ProfileAvatar from '../../components/Profile/profileAvatar';
import AdsList from '../../components/Profile/adsList';


class Profile extends Component {

    render() {
        return (
            <section className="uk-margin-top">
                <div className="uk-container">
                    <div uk-grid="">
                        <div className="uk-width-1-4@m">
                            <ProfileAvatar {...this.props} />
                        </div>
                        <div className="uk-width-3-4@m">
                            <div>
                                <div className="uk-card uk-card-default">
                                    <div className="uk-card-body">
                                        <div className="uk-margin uk-text-center">
                                            <p>
                                                Post an Ad and start selling
                                            </p>
                                            <Link to="/post-ad" className="uk-button uk-button-primary">
                                                Post Ad
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="uk-card uk-card-default">
                                    <div className="uk-card-body">
                                        <div className="uk-margin uk-text-center">
                                            <AdsList {...this.props} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user:state.user,
        client:state.client
    }
}

export default connect(mapStateToProps)(Profile);