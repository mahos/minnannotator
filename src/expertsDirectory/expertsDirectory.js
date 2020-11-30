import React from 'react';
import MapFilter from './mapFilter';
import FilterForm from './detailFilter';
import ExpertListContent from './expertListing';

import './expertsDirectory.css'

class ExpertsDirectory extends React.Component {
    render() {
        return (
            <div className="directoryContent">
                <MapFilter />
                <div className="directory-bottom">
                    <div className="filter-container">
                        <FilterForm />
                    </div>

                    <ExpertListContent />
                    
                </div>
            </div>
        )

    }
}

export default ExpertsDirectory