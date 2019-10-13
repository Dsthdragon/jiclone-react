import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/category';
import { getAd } from '../../actions/ads';
import { getRegions } from '../../actions/regions';
import { getPlacesByRegion } from '../../actions/places';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateAds } from '../../actions/ads';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState,  } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';


class EditAd extends Component {
    state = {
        EditorState: EditorState.createEmpty(),
        Edit_Ad: {
            title: {
                name: "input_title",
                value: ""
            },
            description: {
                name: "input_description",
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
                name: "textarea_summary",
                value: ""
            },
            negotiable: {
                name: "checkbox_negotiable",
                value: false
            }
        },
        ad: null,
        imgSrc: '',
        fallBackSrc: 'images/camera.png',
        error: "",
        loading: false,
    }

    componentDidMount = () => {
        this.props.dispatch(getAd(this.props.match.params.id))
        this.props.dispatch(getCategories())
        this.props.dispatch(getRegions())

    }

    componentDidUpdate = (prevProps) => {
        let Edit_Ad = this.state.Edit_Ad
        let stateChange = false;
        if(this.props.category !== prevProps.category)
        {
            let categories = this.props.category.list;
            if(categories){
                if(categories.status === 'success'){
                    
                    Edit_Ad.category.values = categories.categories;
                    stateChange = true
                }
            }
        }
        if(this.props.region !== prevProps.region)
        {
            let regions = this.props.region.list;
            if(regions){
                if(regions.status === 'success'){
                    Edit_Ad.region.values = regions.regions;
                    stateChange = true
                    
                }
            }
        }
        if(this.props.place !== prevProps.place)
        {
            let places = this.props.place.list;
            if(places){
                if(places.status === 'success'){
                    Edit_Ad.place.values = places.places;
                    stateChange = true
                    
                }
            }
        }
        
        if(this.props.ad !== prevProps.ad)
        {
            if(!prevProps.ad === false){
                if(this.props.ad.single){
                    let ad = this.props.ad.single.ad
                    
                    if(ad.client.id !== this.props.user.auth.client.id)
                    {
                        this.props.history.push("/profile")
                    }
                    var contentState = stateFromHTML(ad.description)
                    let editorState = EditorState.createWithContent(contentState)
                    let edit = this.state.Edit_Ad
                    edit.category.value = ad.category.id
                    edit.open.value = ad.open
                    edit.price.value = ad.price
                    edit.place.value = ad.place.id
                    edit.region.value = ad.region.id
                    edit.title.value = ad.title
                    edit.description.value = ad.description
                    edit.address.value = ad.address
                    edit.summary.value = ad.summary
                    edit.negotiable.value = ad.negotiable
                    edit.phone.value = ad.phone
                    this.setState({
                        editorState,
                        ad: this.props.ad.single.ad,
                        Edit_Ad:edit
                    })
                    this.props.dispatch(getPlacesByRegion(ad.region.id))
                }
            }
            let updatedAd = this.props.ad.update;
            if(updatedAd){
                if(updatedAd !== prevProps.ad.update){
                    if(updatedAd.status === 'success'){
                        this.props.history.push(`/my-ad/${updatedAd.ad.id}`)
                    } else {
                        this.setState({
                            error: updatedAd.message,
                            loading: false
                        })
                    }
                }
            }
        }

        if(stateChange){
            this.setState({
                Edit_Ad
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
        let Edit_Ad = this.state.Edit_Ad;
        Edit_Ad.category.value = e.target.value;

        this.setState({
            Edit_Ad
        })
    }

    selectRegionChange = (e) => {
        let Edit_Ad = this.state.Edit_Ad;
        Edit_Ad.region.value = e.target.value;
        if(e.target.value !== ""){
            this.props.dispatch(getPlacesByRegion(e.target.value))
        }
        this.setState({
            Edit_Ad
        })
    }

    selectPlaceChange = (e) => {
        let Edit_Ad = this.state.Edit_Ad;
        Edit_Ad.place.value = e.target.value;
        
        this.setState({
            Edit_Ad
        })
    }
    
    radioOpenClick = (e, status) => {
        let Edit_Ad = this.state.Edit_Ad
        Edit_Ad.open.value = status
        this.setState({
            Edit_Ad
        })
    }
    
    checkNegotiableChange = (e) => {
        
        let Edit_Ad = this.state.Edit_Ad
        Edit_Ad.negotiable.value = e.target.checked;
        this.setState({
            Edit_Ad
        })
    }


    inputPriceChange = (e) => {
        let Edit_Ad = this.state.Edit_Ad;
        Edit_Ad.price.value = e.target.value;
        
        this.setState({
            Edit_Ad
        })
    }


    inputPhoneChange = (e) => {
        let Edit_Ad = this.state.Edit_Ad;
        Edit_Ad.phone.value = e.target.value;
        
        this.setState({
            Edit_Ad
        })
    }

    inputTitleChange = (e) => {
        let Edit_Ad = this.state.Edit_Ad;
        Edit_Ad.title.value = e.target.value;
        
        this.setState({
            Edit_Ad
        })
    }

    textareaAddressChange = (e) => {
        let Edit_Ad = this.state.Edit_Ad;
        Edit_Ad.address.value = e.target.value;

        this.setState({
            Edit_Ad
        })
    }

    textareaSummaryChange = (e) => {
        let Edit_Ad = this.state.Edit_Ad;
        Edit_Ad.summary.value = e.target.value;

        this.setState({
            Edit_Ad
        })
    }

    

    editorDescriptionChange = (editorState) => {
        let Edit_Ad = this.state.Edit_Ad;
        
        let contentState = editorState.getCurrentContent();

        let html = stateToHTML(contentState);

        Edit_Ad.description.value = html;

        this.setState({
            Edit_Ad,
            editorState
        })
    }

    setDefaultImage = () => {
        this.setState({
            imgSrc: this.state.fallBackSrc
        })
    }

    submitAd = (e) => {
        e.preventDefault()
        let Edit_Ad = this.state.Edit_Ad
        let data = {
            description: Edit_Ad.description.value,
            summary: Edit_Ad.summary.value,
            title: Edit_Ad.title.value,
            address: Edit_Ad.address.value,
            category: Edit_Ad.category.value,
            region:  Edit_Ad.region.value,
            place:  Edit_Ad.place.value,
            open:  Edit_Ad.open.value,
            price: Edit_Ad.price.value,
            phone: Edit_Ad.phone.value,
            negotiable: Edit_Ad.negotiable.value,
            id: this.state.ad.id
        }
        this.props.dispatch(updateAds(data))
        this.setState({
            loading: true
        })
    }


    startUpload = (e) => {
        this.refs.uploadFile.click()
    }

    render() {
        let ad = this.state.ad
        return (
            ad?
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
                                        <input type="text" required="" name={this.state.Edit_Ad.title.name} onChange={this.inputTitleChange} placeholder="Enter Title" className="uk-input uk-width-1-3" defaultValue={ad.title} />

                                    </div>

                                    <div className="uk-margin">
                                        <b>Category: </b>
                                        <hr />
                                        <select required className="uk-select uk-width-1-3" name={this.state.Edit_Ad.category.name} onChange={this.selectCategoryChange}  value={this.state.Edit_Ad.category.value}>
                                            <option value=""> -- Category -- </option>
                                            {this.displayOptions(this.state.Edit_Ad.category)}
                                        </select>
                                    </div>

                                    <div className="uk-margin">
                                        <b>Price:</b>
                                        <hr />
                                        <div>
                                            <input type="radio" required="" value={true} name={this.state.Edit_Ad.open.name} className="uk-radio" defaultChecked={ad.open} onClick={(e) => this.radioOpenClick(e, true)} /> Contact for price <br />
                                            <input type="radio" required="" value={false}  name={this.state.Edit_Ad.open.name} className="uk-radio" onClick={(e) => this.radioOpenClick(e, false)} defaultChecked={!ad.open} />  Price
                                            {
                                                this.state.Edit_Ad.open.value !== true ?
                                                    <span className="uk-margin-large-left">
                                                        <input type="text" name={this.state.Edit_Ad.price.name} placeholder="Enter Price" className="uk-input uk-width-1-3 uk-width-1-5@m" onChange={this.inputPriceChange} defaultValue={ad.price} />
                                                        <input type="checkbox" name={this.state.Edit_Ad.negotiable.name} className="uk-checkbox uk-margin-left" onChange={this.checkNegotiableChange} defaultChecked={ad.negotiable} /> Negotiable
                                                    </span>
                                                : null
                                            }
                                        </div>
                                    </div>

                                    <div className="uk-margin">
                                        <b>Summary:</b>
                                        <hr />
                                        <textarea className="uk-textarea uk-width-2-3" required="" rows="2" name={this.state.Edit_Ad.address.name} onChange={this.textareaSummaryChange} defaultValue={ad.summary} ></textarea>
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
                                        <input type="text" name={this.state.Edit_Ad.phone.name} onChange={this.inputPhoneChange} placeholder="Enter Phone" className="uk-input uk-width-1-3" defaultValue={ad.phone} />

                                    </div>
                                    <div className="uk-margin">
                                        <b>Address:</b>
                                        <hr />
                                        <textarea className="uk-textarea uk-width-2-3" required="" rows="2" name={this.state.Edit_Ad.address.name} onChange={this.textareaAddressChange} defaultValue={ad.address} ></textarea>
                                    </div>
                                    <div className="uk-margin">
                                        <b>Region: </b>
                                        <hr />
                                        <select required className="uk-select uk-width-1-3" name={this.state.Edit_Ad.region.name} onChange={this.selectRegionChange} value={this.state.Edit_Ad.region.value}>
                                            <option value=""> -- Region -- </option>
                                            {this.displayOptions(this.state.Edit_Ad.region)}
                                        </select>
                                    </div>
                                    <div className="uk-margin">
                                        <b>Place: </b>
                                        <hr />
                                        <select required className="uk-select uk-width-1-3" name={this.state.Edit_Ad.place.name} onChange={this.selectPlaceChange} value={this.state.Edit_Ad.place.value}>
                                            <option value=""> -- Place -- </option>
                                            {this.displayOptions(this.state.Edit_Ad.place)}
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
                                    <div>
                                        <Link to={`/my-ad/${ad.id}`} className="uk-button uk-button-secondary uk-margin-right">
                                            <FontAwesomeIcon icon="backward" />
                                        </Link>
                                        <button className="uk-button uk-button-primary" type="submit">
                                            <FontAwesomeIcon icon="save" />
                                        </button>
                                    </div>
                                }
                            </div>
                        </form>
                    </div>
                </section>
            : null
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

export default connect(mapStateToProps)(EditAd);