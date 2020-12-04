import React from 'react';
import './expertListing.css';
import _ from 'lodash';

import placeholderImage from '../images/image-placeholder.png';
import { ReactComponent as CaretDown} from '../images/icons/caret-down.svg';
import { ReactComponent as CommunityChecked} from '../images/icons/check-circle.svg';
import { ReactComponent as InternetIcon} from '../images/icons/www.svg';

// import languages from './random'
const expertsData = require('./experts.json');
const langFlagData = require('./langFlagByCode.json')
// const icons = require('../images/icons/caret-down.svg');


console.log('expertsData: ', expertsData);
const voteOrderedData = _.sortBy(expertsData, ['votes']).reverse();
console.log('voteOrderedData: ', voteOrderedData)

console.log('languages and flag data: ', langFlagData)

let filteredData = [];


class ExpertListContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultCount: Math.floor(Math.random() * 1000),
            flagHover: false
        }
    }
    narrowData(region, options) {
        filteredData = [];
        console.log('narrowing down region data - ', region)
        if (region == 'All Regions' && options.length == 0) {
            filteredData = voteOrderedData;
            return;
        }
        voteOrderedData.forEach(data => {
            if (data['locations'].includes(region)) {
                filteredData.push(data);
            } 

            options.forEach(reqOption => {
                console.log('going around options: ', reqOption);
            })
            
        })
    }

    handleFlagMouseEnter() {
        console.log('flag mouseover activated!');
        this.setState({flagHover: true});
    }
    handleFlagMouseExit() {
        console.log('flag mouse out activated!');
        this.setState({flagHover: false});
    }


    render() {
        this.narrowData(this.props.region, this.props.options)
        const flagCaptionStyle = {
            display: this.state.flagHover ? 'block': 'none'
        }
        return (
            <div className="filter-result-content">
                <div className="result-stat-area">
                    <label className="result-count">{filteredData.length} results</label>
                    <div className="sorter">
                        <label>Sort by: 
                            <select>
                                <option>Votes</option>
                                <option>Alphabetical (A-Z)</option>
                                <option>Alphabetical (Z-A)</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="result-listing-area">
                    {filteredData.slice(0,8).map(expert => {
                        return (
                            <div className="expert-card">
                                <div className="votes-zone">
                                    <svg className="caret-up" height="11.859" viewBox="0 0 20.911 11.859" width="20.911"><path d="m20.3 24.75h-18.1a1.406 1.406 0 0 1 -.994-2.4l9.05-9.05a1.406 1.406 0 0 1 1.989 0l9.047 9.047a1.406 1.406 0 0 1 -.992 2.403z" fill="#6e6e6e" opacity=".278" transform="translate(-.794 -12.891)"/></svg>
                                    <div className="vote-count">{expert['votes']}</div>
                                    <figcaption className="tiny-caption">votes</figcaption>
                                    <CaretDown className="caret-down"/>
                                    {/* <svg className="caret-down" width="20.911" height="11.859" viewBox="0 0 20.911 11.859"><path d="M20.3,12.891H2.2a1.406,1.406,0,0,0-.994,2.4l9.047,9.047a1.406,1.406,0,0,0,1.989,0l9.047-9.047A1.406,1.406,0,0,0,20.3,12.891Z" fill="#6e6e6e" opacity=".278" transform="translate(-0.794 -12.891)"/></svg> */}
                                </div>
                                <div className="images-zone">
                                    <img className="main-image" alt={"image of " + expert['name']} src={expert['images'][0] ?`${process.env.PUBLIC_URL}/mockData/${expert['id']}/${expert['images'][0]}` : placeholderImage} />
                                    <div>
                                        <img className="sub-image" alt={"image of " + expert['name']} src={expert['images'][1] ?`${process.env.PUBLIC_URL}/mockData/${expert['id']}/${expert['images'][1]}` : placeholderImage} />
                                        <img className="sub-image"  alt={"image of " + expert['name']} src={expert['images'][2] ?`${process.env.PUBLIC_URL}/mockData/${expert['id']}/${expert['images'][2]}` : placeholderImage} />
                                    </div>
                                </div>
                                <div className="details-zone">
                                    <div className="business-title">
                                        <h2>{expert['name']}</h2>{expert['reviewed']?<CommunityChecked className="community-badge" />: null}
                                    </div>
                                    <div className="tags">
                                        {expert['tags'].map(tagItem => {
                                            return <div className="tag-badge">{tagItem}</div>
                                        })}
                                    </div>
                                    <div className="locations">
                                        <h6>Locations</h6>
                                        <div className="location-list">
                                        {expert['locations'].map(location => {
                                            return <div className="location">{location}</div>
                                        })}
                                        </div>
                                    </div>
                                    <div className="website">
                                        <InternetIcon /><span><a>{expert['website']}</a></span>
                                    </div>
                                    <div className="website-languages">
                                        <h6>Website in</h6>
                                        <div className="flag-list">{
                                            expert['website-lang'].map(weblang => {
                                                if (langFlagData[weblang]['flagEmoji']){
                                                    return (
                                                        <div className="flag-icon">
                                                            <p onMouseOver={this.handleFlagMouseEnter.bind(this)} onMouseOut={this.handleFlagMouseExit.bind(this)}>{langFlagData[weblang]['flag']}</p>
                                                            <figcaption style={flagCaptionStyle} className="subcaption">{langFlagData[weblang]['langName']}</figcaption>
                                                        </div>
                                                        
                                                    )
                                                } else {
                                                    return (
                                                        <div className="flag-icon">
                                                            <img onMouseOver={this.handleFlagMouseEnter.bind(this)} onMouseOut={this.handleFlagMouseExit.bind(this)} src={langFlagData[weblang]['flag']} />
                                                            <figcaption style={flagCaptionStyle} className="subcaption">{langFlagData[weblang]['langName']}</figcaption>
                                                            
                                                        </div>
                                                        
                                                    )
                                                }
                                                
                                            })
                                        }
                                        </div>
                                    </div>
                                    <div className="annotation-languages">
                                        <h6>Review annotation available in</h6>
                                        <div className="flag-list"> 
                                            {
                                                expert['annotation-info']['annotation-lang'].slice(0,3).map(annolang => {
                                                    if (langFlagData[annolang]['flagEmoji']){
                                                        return (
                                                            <div className="flag-icon">
                                                                <p onMouseOver={this.handleFlagMouseEnter.bind(this)} onMouseOut={this.handleFlagMouseExit.bind(this)}>{langFlagData[annolang]['flag']}</p>
                                                                <figcaption style={flagCaptionStyle} className="subcaption">{langFlagData[annolang]['langName']}</figcaption>
                                                            </div>
                                                            
                                                        )
                                                    } else {
                                                        return (
                                                            <div className="flag-icon">
                                                                <img onMouseOver={this.handleFlagMouseEnter.bind(this)} onMouseOut={this.handleFlagMouseExit.bind(this)} src={langFlagData[annolang]['flag']} />
                                                                <figcaption style={flagCaptionStyle} className="subcaption">{langFlagData[annolang]['langName']}</figcaption>
                                                                
                                                            </div>
                                                            
                                                        )
                                                    }
                                                    
                                                })
                                            }
                                            {expert['annotation-info']['annotation-lang'].length > 3 ? 
                                            <div>
                                                <p className="remainder-lang">+{expert['annotation-info']['annotation-lang'].length - 3}</p> 
                                                <div className="other-flags">{expert['annotation-info']['annotation-lang'].slice(3).map(rest => {
                                                
                                                    if (langFlagData[rest]['flagEmoji']){
                                                        return (
                                                            <div className="flag-icon small">
                                                                <p onMouseOver={this.handleFlagMouseEnter.bind(this)} onMouseOut={this.handleFlagMouseExit.bind(this)}>{langFlagData[rest]['flag']}</p>
                                                                <figcaption style={flagCaptionStyle} className="subcaption">{langFlagData[rest]['langName']}</figcaption>
                                                            </div>
                                                            
                                                        )
                                                    } else {
                                                        return (
                                                            <div className="flag-icon small">
                                                                <img onMouseOver={this.handleFlagMouseEnter.bind(this)} onMouseOut={this.handleFlagMouseExit.bind(this)} src={langFlagData[rest]['flag']} />
                                                                <figcaption style={flagCaptionStyle} className="subcaption">{langFlagData[rest]['langName']}</figcaption>
                                                                
                                                            </div>
                                                            
                                                        )
                                                    }
                                                    
                                                })}</div>
                                            </div>
                                            : null}
                                        </div>
                                    </div>
                                    <div className="annotator-info">
                                        <div className="user-info">
                                            <h6>Last annotated by {expert['annotation-info']['annotators'].slice(-1)[0][0]}</h6> {/* each annotator ["User Z", "2020-11-03T19:09:22GMT", "en"] */}
                                            <span>{langFlagData[expert['annotation-info']['annotators'].slice(-1)[0][2]]['flagEmoji']? langFlagData[expert['annotation-info']['annotators'].slice(-1)[0][2]]['flag']: <img src={langFlagData[expert['annotation-info']['annotators'].slice(-1)[0][2]]['flag']}/>}</span>
                                        </div>
                                        <h6>On {new Date(expert['annotation-info']['annotators'].slice(-1)[0][1]).toDateString()}</h6>
                                    </div>
                                </div>
                                <div className="action-zone">
                                    <a className="read-more-button" href={'/detail/' + expert['id']}><button className="primary">Go Read More</button></a>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}

export default ExpertListContent