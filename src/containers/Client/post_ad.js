import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/category';
import { getRegions } from '../../actions/regions';
import { getPlacesByRegion } from '../../actions/places';
import { createAds } from '../../actions/ads';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

class PostAd extends Component {
    state = {
        EditorState: EditorState.createEmpty(),
        Post_Ad: {
            title: {
                name: "input_title",
                value: ""
            },
            description: {
                name: "editor_description",
                value: ""
            },
            category: {
                name: "select_category",
                value: "",
                values: [

                ]
            },
            region: {
                name: "select_region",
                value: "",
                values: [

                ]
            },
            place: {
                name: "select_place",
                value: "",
                values: [

                ]
            },
            open: {
                name: "radio_open",
                value: false,
            },
            image: {
                name: "input_image",
                value: "",
                type: ""
            },
            price: {
                name: "input_price",
                value: "",
            },
            phone: {
                name: "input_phone",
                value: "",
            },
            address: {
                name: "textarea_address",
                value: ""
            },
            summary: {
                name: "summary_address",
                value: ""
            },
            negotiable: {
                name: "checkbox_negotiable",
                value: false
            }
        },
        imgSrc: '',
        fallBackSrc: 'images/camera.png',
        error: "",
        loading: false,
    }

    componentDidMount = () => {
        this.props.dispatch(getCategories())
        this.props.dispatch(getRegions())
    }

    componentDidUpdate = (prevProps) => {
        let Post_Ad = this.state.Post_Ad
        let stateChange = false;
        if(this.props.category !== prevProps.category)
        {
            let categories = this.props.category.list;
            if(categories){
                if(categories.status === 'success'){
                    
                    Post_Ad.category.values = categories.categories;
                    stateChange = true
                }
            }
        }
        if(this.props.region !== prevProps.region)
        {
            let regions = this.props.region.list;
            if(regions){
                if(regions.status === 'success'){
                    Post_Ad.region.values = regions.regions;
                    stateChange = true
                    
                }
            }
        }
        if(this.props.place !== prevProps.place)
        {
            let places = this.props.place.list;
            if(places){
                if(places.status === 'success'){
                    Post_Ad.place.values = places.places;
                    stateChange = true
                    
                }
            }
        }
        
        if(this.props.ad !== prevProps.ad)
        {
            let createdAd = this.props.ad.create;
            if(createdAd){
                if(createdAd !== prevProps.ad.create){
                    if(createdAd.status === 'success'){
                        this.props.history.push(`/my-ad/${createdAd.ad.id}`)
                    } else {
                        this.setState({
                            error: createdAd.message,
                            loading: false
                        })
                    }
                }
            }
        }

        if(stateChange){
            this.setState({
                Post_Ad
            })
        }
    }

    displayOptions = (options) => {
        if(options.values){
            return options.values.map((item, i) => (
                <option value={item.id} key={i}>
                    {item.title}
                </option>
            ))
        }
    }

    selectCategoryChange = (e) => {
        let Post_Ad = this.state.Post_Ad;
        Post_Ad.category.value = e.target.value;

        this.setState({
            Post_Ad
        })
    }

    selectRegionChange = (e) => {
        let Post_Ad = this.state.Post_Ad;
        Post_Ad.region.value = e.target.value;
        if(e.target.value !== ""){
            this.props.dispatch(getPlacesByRegion(e.target.value))
        }
        this.setState({
            Post_Ad
        })
    }

    selectPlaceChange = (e) => {
        let Post_Ad = this.state.Post_Ad;
        Post_Ad.place.value = e.target.value;
        
        this.setState({
            Post_Ad
        })
    }
    
    radioOpenClick = (e, status) => {
        let Post_Ad = this.state.Post_Ad
        Post_Ad.open.value = status
        this.setState({
            Post_Ad
        })
    }
    
    checkNegotiableChange = (e) => {
        
        let Post_Ad = this.state.Post_Ad
        Post_Ad.negotiable.value = e.target.checked;
        this.setState({
            Post_Ad
        })
    }


    inputPriceChange = (e) => {
        let Post_Ad = this.state.Post_Ad;
        Post_Ad.price.value = e.target.value;
        
        this.setState({
            Post_Ad
        })
    }


    inputPhoneChange = (e) => {
        let Post_Ad = this.state.Post_Ad;
        Post_Ad.phone.value = e.target.value;
        
        this.setState({
            Post_Ad
        })
    }

    inputTitleChange = (e) => {
        let Post_Ad = this.state.Post_Ad;
        Post_Ad.title.value = e.target.value;
        
        this.setState({
            Post_Ad
        })
    }

    editorDescriptionChange = (editorState) => {
        let Post_Ad = this.state.Post_Ad;
        
        let contentState = editorState.getCurrentContent();

        let html = stateToHTML(contentState);

        Post_Ad.description.value = html;

        this.setState({
            Post_Ad,
            editorState
        })
    }

    textareaAddressChange = (e) => {
        let Post_Ad = this.state.Post_Ad;
        Post_Ad.address.value = e.target.value;

        this.setState({
            Post_Ad
        })
    }

    textareaSummaryChange = (e) => {
        let Post_Ad = this.state.Post_Ad;
        Post_Ad.summary.value = e.target.value;

        this.setState({
            Post_Ad
        })
    }

    setDefaultImage = () => {
        this.setState({
            imgSrc: this.state.fallBackSrc
        })
    }

    submitAd = (e) => {
        e.preventDefault()
        let Post_Ad = this.state.Post_Ad
        let data = {
            description: Post_Ad.description.value,
            address: Post_Ad.address.value,
            summary: Post_Ad.summary.value,
            title: Post_Ad.title.value,
            category: Post_Ad.category.value,
            region:  Post_Ad.region.value,
            place:  Post_Ad.place.value,
            open:  Post_Ad.open.value,
            price: Post_Ad.price.value,
            phone: Post_Ad.phone.value,
            negotiable: Post_Ad.negotiable.value,
            image: Post_Ad.image.value,
            type: Post_Ad.image.type,
            client: this.props.user.auth.client.id
        }
        this.props.dispatch(createAds(data))
        this.setState({
            loading: true
        })
    }

    

    uploadImage = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0]
        let ext = file.name.split('.')
        ext = ext[ext.length-1]
        
        reader.onloadend = () => {
            let img = reader.result.split(',', 2)
            let Post_Ad = this.state.Post_Ad;
            Post_Ad.image.value = img[1];
            Post_Ad.image.type = ext;
            let imgSrc = reader.result;

            this.setState({
                Post_Ad,
                imgSrc
            })

        }

        reader.readAsDataURL(file)
        
    }

    startUpload = (e) => {
        this.refs.uploadFile.click()
    }

    render() {
        return (
            <section className="uk-container uk-margin-top">
                <div className="uk-width-1-1">
                    <form onSubmit={this.submitAd}>
                        <div className="uk-card uk-card-default">
                            <div className="uk-card-header">
                                <h2 className="uk-card-title">Ad Details</h2>
                            </div>
                            <div className="uk-card-body">
                                <div className="uk-margin">
                                    <b>Title: </b>
                                    <hr />
                                    <input type="text" name={this.state.Post_Ad.title.name} onChange={this.inputTitleChange} placeholder="Enter Title" required="" className="uk-input uk-width-1-3" />

                                </div>

                                <div className="uk-margin">
                                    <b>Category: </b>
                                    <hr />
                                    <select required className="uk-select uk-width-1-3" name={this.state.Post_Ad.category.name} onChange={this.selectCategoryChange}>
                                        <option value=""> -- Category -- </option>
                                        {this.displayOptions(this.state.Post_Ad.category)}
                                    </select>
                                </div>

                                <div className="uk-margin">
                                    <b>Title Picture: </b>
                                    <hr />
                                    <div className="uk-width-1-5@m uk-width-1-3" >
                                        <div className="uk-inline uk-width-1-1 uk-border-rounded" onClick={
        this.startUpload} style={{border:"2px solid #ddd"}} >
                                            <img src={this.state.imgSrc} onError={this.setDefaultImage} alt="Avatar" width="100%" className="uk-border-rounded" />
                                            <input type="file"  onChange={this.uploadImage.bind(this)} ref="uploadFile" id="uploadImage" style={{display:'none'}}  />
                                        </div>
                                    </div>
                                </div>

                                <div className="uk-margin">
                                    <b>Price:</b>
                                    <div>
                                        <input type="radio" required="" value={true} name={this.state.Post_Ad.open.name} className="uk-radio" onClick={(e) => this.radioOpenClick(e, true)} /> Contact for price <br />
                                        <input type="radio" required="" value={false}  name={this.state.Post_Ad.open.name} className="uk-radio" onClick={(e) => this.radioOpenClick(e, false)} defaultChecked="true" />  Price
                                        {
                                            this.state.Post_Ad.open.value !== true ?
                                                <span className="uk-margin-large-left">
                                                    <input type="text" name={this.state.Post_Ad.price.name} placeholder="Enter Price" className="uk-input uk-width-1-3 uk-width-1-5@m" onChange={this.inputPriceChange} />
                                                    <input type="checkbox" name={this.state.Post_Ad.negotiable.name} className="uk-checkbox uk-margin-left" onChange={this.checkNegotiableChange} /> Negotiable
                                                </span>
                                            : null
                                        }
                                    </div>
                                </div>

                                <div className="uk-margin">
                                    <b>Summary:</b>
                                    <hr />
                                    <textarea className="uk-textarea uk-width-2-3" required="" rows="2" name={this.state.Post_Ad.summary.name} onChange={this.textareaSummaryChange}></textarea>
                                </div>
                                <div className="uk-margin">
                                    <b>Description:</b>
                                    <hr />
                                    <Editor 
                                        editorState={this.state.editorState}
                                        wrapperClassName="myEditor-wrapper"
                                        editorClassName="myEditor-editor"
                                        onEditorStateChange={this.editorDescriptionChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="uk-card uk-card-default uk-margin-top">
                            <div className="uk-card-header">
                                <h2 className="uk-card-title">Contact Information for Ad</h2>
                            </div>
                            <div className="uk-card-body">
                                <div className="uk-margin">
                                    <b>Name: </b>
                                    {
                                        this.props.user.auth ?
                                            this.props.user.auth.client.last_name + " " + this.props.user.auth.client.first_name
                                        : null
                                    }
                                </div>
                                <div className="uk-margin">
                                    <b>Phone: </b>
                                    <hr />
                                    <input type="text" name={this.state.Post_Ad.phone.name} onChange={this.inputPhoneChange} placeholder="Enter Phone" className="uk-input uk-width-1-3" />

                                </div>
                                <div className="uk-margin">
                                    <b>Address:</b>
                                    <hr />
                                    <textarea className="uk-textarea uk-width-2-3" required="" rows="2" name={this.state.Post_Ad.address.name} onChange={this.textareaAddressChange}></textarea>
                                </div>
                                <div className="uk-margin">
                                    <b>Region: </b>
                                    <hr />
                                    <select required className="uk-select uk-width-1-3" name={this.state.Post_Ad.region.name} onChange={this.selectRegionChange}>
                                        <option value=""> -- Region -- </option>
                                        {this.displayOptions(this.state.Post_Ad.region)}
                                    </select>
                                </div>
                                <div className="uk-margin">
                                    <b>Place: </b>
                                    <hr />
                                    <select required className="uk-select uk-width-1-3" name={this.state.Post_Ad.place.name} onChange={this.selectPlaceChange}>
                                        <option value=""> -- Place -- </option>
                                        {this.displayOptions(this.state.Post_Ad.place)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="uk-text-center uk-margin">
                            {
                                this.state.error ? 
                                    <div className="uk-alert uk-alert-danger">
                                        {this.state.error}
                                    </div>
                                : null
                            }
                            {
                                this.state.loading ?
                                    <div>
                                        Processing
                                        <span className="uk-spinner uk-icon uk-margin-left" uk-spinner="ratio: .5"></span>
                                    </div>
                                :
                                <button className="uk-button uk-button-primary" type="submit">
                                    Post Ad 
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user:state.user,
        client:state.client,
        region:state.region,
        category:state.category,
        place:state.place,
        ad:state.ad
    }
}

export default connect(mapStateToProps)(PostAd);