import React from 'react';
import './mapFilter.css'

const japanRegions = require('./japanRegions.json')

class MapView extends React.Component {
    // constructor(props) {
    //     super(props);
        
    // }



    render() {
        const selectedRegion = this.props.hoveredRegion;
        const selectedPrefecture = this.props.clickedPrefecture;
        const mapOrder = ['Hokkaido', 'Tohoku', 'Chubu', 'Kanto', 'Kansai', 'Chugoku', 'Shikoku', 'Kyushu', 'Okinawa']

        // const fullList = regionOrder.forEach(region => {
        const japanMap = mapOrder.map(region => {
            return (
                <div className="region-map">
                    <label className="region-caption">{region}</label>
                    <div className={region === selectedRegion ? 'prefecture-area selected': 'prefecture-area'}>
                        {japanRegions[region].map(prefecture => {
                            return (
                                <div className={prefecture === selectedPrefecture ? 'prefecture-map selected': 'prefecture-map'}>
                                    <label className="prefecture-caption">{prefecture}</label>
                                </div>
                            )    
                        })}
                    </div>
                </div>
            )
        })

        return (
            <div className="japan-map">
                {japanMap}
            </div>
        )
    }
}

class RegionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegionHover = this.handleRegionHover.bind(this);
        this.handlePrefectureClick = this.handlePrefectureClick.bind(this);
    }

    handleRegionHover(event, region) {
        event.stopPropagation();
        // this.setState({selectedRegion: region})
        this.props.onRegionHovered(region);
    }

    handlePrefectureClick(event, prefecture) {
        event.stopPropagation();
        this.props.onPrefectureClicked(prefecture);
        this.props.onRegionHovered('');
    }

    
    render() {
        const selectedPrefecture = this.props.clickedPrefecture;
        const regionOrder = [{'Misc': 'Nationwide'}, {'Hokkaido': 'Hokkaido'}, {'Kanto': 'Kanto Region'}, 
        {'Kansai': 'Kansai Region'}, {'Shikoku': 'Shikoku'}, {'Tohoku': 'Tohoku Region'}, {'Chubu': 'Chubu Region'}, 
        {'Chugoku': 'Chugoku Region'}, {'Kyushu': 'Kyushu'}, {'Okinawa': 'Okinawa'}]

        // const fullList = regionOrder.forEach(region => {
        const fullList = regionOrder.map(region => {
            // console.log('region key', Object.keys(region)[0])
            return (
                <div className="region" onMouseOver={(event) => {this.handleRegionHover(event, Object.keys(region)[0])}}>
                    <h4 className="region-title">{Object.values(region)[0]}</h4>
                    <ul className="prefecture-listing">
                        {japanRegions[Object.keys(region)[0]].map(prefecture => {
                            // console.log('prefecture', prefecture)
                            return (
                                <li className={prefecture === selectedPrefecture? 'prefecture-name selected': 'prefecture-name'} onClick={(event) => {this.handlePrefectureClick(event, prefecture)}}>
                                    <div>{prefecture}</div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        })
        // console.log('fullList: ', fullList)

        return (
            <div className="region-text-panel">
                <h2>Look for legal professional by region</h2>
                <div className="region-full-list">
                    {fullList}
                </div>
            </div>
        )
    }
}

class MapFilter extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegionHover = this.handleRegionHover.bind(this);
        this.handleClickedPrefecture = this.handleClickedPrefecture.bind(this)
        this.state = {
            hoveredRegion: 'Misc',
            selectedPrefecture: 'All Regions'
        }
    }

    handleRegionHover(region) {
        this.setState({hoveredRegion: region});
    }

    handleClickedPrefecture(prefecture) {
        this.setState({selectedPrefecture: prefecture});
    }

    
    render() {
        const focusRegion = this.state.hoveredRegion;
        const selectedPrefecture = this.state.selectedPrefecture;
        return (
            <div className="map-filter-area">
            <MapView hoveredRegion={focusRegion} clickedPrefecture={selectedPrefecture}/>
            <RegionSelector clickedPrefecture={selectedPrefecture} onRegionHovered={this.handleRegionHover} onPrefectureClicked={this.handleClickedPrefecture} />
            </div>
        )
    }
}



export default MapFilter
