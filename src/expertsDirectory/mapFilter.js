import React from 'react';
import './mapFilter.css'

import { ReactComponent as JapanMap } from '../images/japanMap.svg';

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

        let styleCSS = `
            #${this.props.clickedPrefecture} {
                fill: #606;
                opacity: 1;
            }
            #${this.props.hoveredRegion+'Overlay'} {
                stroke: #606;
            }
        `

        return (
            <div className="japan-map">
                <style>{styleCSS}</style>
                <JapanMap />
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
        const regionOrder = [{'Misc': 'Nationwide'}, {'Chubu': 'Chubu Region'}, {'Kansai': 'Kansai Region'}, {'Chugoku': 'Chugoku Region'},
        {'Kyushu': 'Kyushu'}, {'Hokkaido': 'Hokkaido'}, {'Tohoku': 'Tohoku Region'},  {'Kanto': 'Kanto Region'}, 
         {'Shikoku': 'Shikoku'}, {'Okinawa': 'Okinawa'}]

        const fullList = regionOrder.map(region => {
            return (
                <li className="region" onMouseOver={(event) => {this.handleRegionHover(event, Object.keys(region)[0])}}>
                    <h4 className="region-title">{Object.values(region)[0]}</h4>
                    <ul className="prefecture-listing">
                        {japanRegions[Object.keys(region)[0]].map(prefecture => {
                            return (
                                <li className={prefecture === selectedPrefecture? 'prefecture-name selected': 'prefecture-name'} onClick={(event) => {this.handlePrefectureClick(event, prefecture)}}>
                                    <div>{prefecture}</div>
                                </li>
                            )
                        })}
                    </ul>
                </li>
            )
        })
        // console.log('fullList: ', fullList)

        return (
            <div className="region-text-panel">
                <h2>Look for legal professionals by region</h2>
                <ul className="region-full-list">
                    {fullList}
                </ul>
            </div>
        )
    }
}

class MapFilter extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegionHover = this.handleRegionHover.bind(this);
        this.handleClickedPrefecture = this.handleClickedPrefecture.bind(this);
        this.state = {
            hoveredRegion: 'Misc',
            selectedPrefecture: this.props.selectedPref
        }
    }

    handleRegionHover(region) {
        this.setState({hoveredRegion: region});
    }

    handleClickedPrefecture(prefecture) {
        this.setState({selectedPrefecture: prefecture});
        this.props.onRegionSelection(prefecture)
    }

    
    render() {
        console.log('selected pref: ', this.state.selectedPrefecture)
        const focusRegion = this.state.hoveredRegion;
        let selectedPrefecture = this.state.selectedPrefecture;
        return (
            <div className="map-filter-area">
                <MapView hoveredRegion={focusRegion} clickedPrefecture={selectedPrefecture}/>
                <RegionSelector className="text-filter" clickedPrefecture={selectedPrefecture} onRegionHovered={this.handleRegionHover} onPrefectureClicked={this.handleClickedPrefecture} />
            </div>
        )
    }
}



export default MapFilter
