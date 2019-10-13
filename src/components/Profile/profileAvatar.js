import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import { uploadAvatar } from '../../actions/clients';
import { MEDIA_URL } from '../../config';

class ProfileAvatar extends Component {
    
    client = this.props.user.auth.client
    state = {
        upload: '',
        imgSrc: this.client.avatar ? MEDIA_URL + this.client.avatar : '/images/avatar.svg',
        fallBackSrc: '/images/avatar.svg',
        loading: false
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
                id: this.client.id,
                type: ext,
                img: img[1]
            }
            this.props.dispatch(uploadAvatar(data))
        }
        reader.readAsDataURL(file)
    }

    componentDidUpdate(prevProps){
        if(prevProps.client !== this.props.client)
        {
            if (this.props.client.clientAvatarUpload){
                let uploadResponse = this.props.client.clientAvatarUpload;
                if (uploadResponse.status === 'success')
                {
                    this.setState({
                        loading: false,
                        imgSrc: MEDIA_URL + uploadResponse.client.avatar,
                    })
                } else {
                    
                    this.setState({
                        loading: false
                    })
                    alert(uploadResponse.message)
                }
            }
        }
    }

    showLoader = () => (
        this.state.loading ?
            <div className="uk-overlay-primary uk-position-cover" style={{borderRadius: '50%'}} >
                <div className="uk-position-center uk-spinner uk-icon" uk-spinner="ratio: 1"></div>
            </div>
        : null
    )
    

    startUpload = (e) => {
        this.refs.uploadFile.click()
    }
    

    setDefaultImage = () => {
        this.setState({
            imgSrc: this.state.fallBackSrc
        })
    }
    
    render(){
        return (
            <div className="uk-text-center uk-card uk-card-default">
                <div className="uk-card-header">
                    <div className="uk-inline">
                        <img src={this.state.imgSrc} onError={this.setDefaultImage} alt="Avatar" width="100" style={{borderRadius: '50%'}} />
                        {
                            !this.state.loading ?
                                <div className="uk-position-bottom-right uk-icon-button" onClick={this.startUpload}>
                                    <FontAwesomeIcon icon="camera" />
                                    <input type="file"  onChange={this.uploadImage.bind(this)} ref="uploadFile"
                                    id="uploadImage" style={{display:'none'}}  />
                                </div>
                            : null
                        }
                        
                        {this.showLoader()}
                    </div>
                </div>
                <div className="uk-card-body">
                    <b>
                        {this.client.last_name} {this.client.first_name}<br />
                    </b>
                </div>
                
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        user:state.user,
        client:state.client
    }
}
export default connect(mapStateToProps)(ProfileAvatar)