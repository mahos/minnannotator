import React from 'react';
import MapFilter from './mapFilter';
import FilterForm from './detailFilter';
import ExpertListContent from './expertListing';

import './expertsDirectory.css'

class ExpertsDirectory extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegionSelection = this.handleRegionSelection.bind(this)
        this.state = {
            region: 'All Regions',
            options: []
        }
    }

    handleRegionSelection(region) {
        console.log('handleRegionSelection Ran!!!!!');
        if (region == 'All Regions') {
            this.setState({region: 'All Regions'});
        } else {
            this.setState({region: region});
        }
        
    }
    render() {
        console.log('selected state: ', this.state.region)
        return (
            <div className="directoryContent">
                <MapFilter onRegionSelection={this.handleRegionSelection} selectedPref={this.state.region}/>
                <div className="directory-bottom">
                    <div className="filter-container">
                        <FilterForm />
                    </div>

                    <ExpertListContent region={this.state.region} options={this.state.options}/>
                    
                </div>
            </div>
        )

    }
}

export default ExpertsDirectory