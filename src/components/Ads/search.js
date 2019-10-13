import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/category';
import { getRegions } from '../../actions/regions';
import { getPlacesByRegion } from '../../actions/places';

class SearchArea extends Component {
    state = {
        Search_Options: {
            title: {
                name: "input_title",
                value: ""
            },
            address: {
                name: "input_address",
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
            }
        },
        loading: false,
    }

    componentDidMount = () => {
        this.props.dispatch(getCategories())
        this.props.dispatch(getRegions())
    }

    inputTitleChange = (e) => {
        let Search_Options = this.state.Search_Options;
        Search_Options.title.value = e.target.value;
        
        this.setState({
            Search_Options
        })
    }

    inputAddressChange = (e) => {
        let Search_Options = this.state.Search_Options;
        Search_Options.address.value = e.target.value;
        
        this.setState({
            Search_Options
        })
    }


    carryOutSearch = () => {
        let params = new URLSearchParams()
        let search_otions = this.state.Search_Options;
        if(search_otions.title.value){
            params.append('title', search_otions.title.value);
        }
        if(search_otions.address.value){
            params.append('address', search_otions.address.value);
        }
        if(search_otions.category.value){
            params.append('category', search_otions.category.value);
        }
        if(search_otions.region.value){
            params.append('region', search_otions.region.value);
        }
        if(search_otions.place.value){
            params.append('place', this.state.Search_Options.place.value);
        }
        this.props.history.push('/')
        this.props.history.push(`/search?${params.toString()}`)
    }


    componentDidUpdate = (prevProps) => {
        let Search_Options = this.state.Search_Options
        let stateChange = false;
        if(this.props.category !== prevProps.category)
        {
            let categories = this.props.category.list;
            if(categories){
                if(categories.status === 'success'){
                    
                    Search_Options.category.values = categories.categories;
                    stateChange = true
                }
            }
        }
        if(this.props.region !== prevProps.region)
        {
            let regions = this.props.region.list;
            if(regions){
                if(regions.status === 'success'){
                    Search_Options.region.values = regions.regions;
                    stateChange = true
                    
                }
            }
        }
        if(this.props.place !== prevProps.place)
        {
            let places = this.props.place.list;
            if(places){
                if(places.status === 'success'){
                    Search_Options.place.values = places.places;
                    stateChange = true
                    
                }
            }
        }

        if(stateChange){
            this.setState({
                Search_Options
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
        let Search_Options = this.state.Search_Options;
        Search_Options.category.value = e.target.value;

        this.setState({
            Search_Options
        })
    }

    selectRegionChange = (e) => {
        let Search_Options = this.state.Search_Options;
        Search_Options.region.value = e.target.value;
        if(e.target.value !== ""){
            this.props.dispatch(getPlacesByRegion(e.target.value))
        }
        this.setState({
            Search_Options
        })
    }

    selectPlaceChange = (e) => {
        let Search_Options = this.state.Search_Options;
        Search_Options.place.value = e.target.value;

        this.setState({
            Search_Options
        })
    }


    render() {
        return (
            <div uk-grid="" className="uk-grid-small uk-grid-margin-small">
                <div className="uk-width-1-1 uk-width-1-3@m uk-width-1-6@l">
                    <input type="text" name={this.state.Search_Options.title.name} className="uk-input" placeholder="Keyword" onChange={this.inputTitleChange}  />
                </div>
                <div className="uk-width-1-1 uk-width-1-3@m uk-width-1-6@l">
                    <input type="text" name={this.state.Search_Options.address.name} className="uk-input" placeholder="Address" onChange={this.inputAddressChange}  />
                </div>
                <div className="uk-width-1-1 uk-width-1-3@m uk-width-1-6@l">
                    <select className="uk-select" name={this.state.Search_Options.category.name} onChange={this.selectCategoryChange}>
                        <option value="">Select Category</option>
                        {this.displayOptions(this.state.Search_Options.category)}
                    </select>
                </div>
                <div className="uk-width-1-1 uk-width-1-3@m uk-width-1-6@l">
                    <select className="uk-select" name={this.state.Search_Options.region.name} onChange={this.selectRegionChange}>
                        <option value="">Select Region</option>
                        {this.displayOptions(this.state.Search_Options.region)}
                    </select>
                </div>
                <div className="uk-width-1-1 uk-width-1-3@m uk-width-1-6@l">
                    <select className="uk-select" name={this.state.Search_Options.place.name}  onChange={this.selectPlaceChange} >
                        <option value="">Select Place</option>
                        {this.displayOptions(this.state.Search_Options.place)}
                    </select>
                </div>
                <div className="uk-width-expand uk-text-center">
                    <button className="uk-button uk-button-primary uk-width-1-1" onClick={this.carryOutSearch}>
                        Find Provider
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        category:state.category,
        place:state.place,
        region:state.region,
        ad:state.ad
    };
}


export default connect(
    mapStateToProps,
)(SearchArea);