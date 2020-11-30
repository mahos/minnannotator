import React from 'react';
import './expertListing.css';
import _ from 'lodash';

import placeholderImage from '../images/image-placeholder.png';
import { ReactComponent as CaretDown} from '../images/icons/caret-down.svg';
import { ReactComponent as CommunityChecked} from '../images/icons/check-circle.svg';

import languages from './random'
const expertsData = require('./experts.json');
const icons = require('../images/icons/caret-down.svg');
console.log('icons: ', icons)

console.log('expertsData: ', expertsData);

console.log(_.sortBy(expertsData, ['votes']));
const voteOrderedData = _.sortBy(expertsData, ['votes']).reverse();
console.log('voteOrderedData: ', voteOrderedData)

console.log('languages: ', languages)


class ExpertListContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultCount: Math.floor(Math.random() * 1000),
        }
    }
    render() {
        return (
            <div className="filter-result-content">
                <div className="result-stat-area">
                    <label className="result-count">{this.state.resultCount} results</label>
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
                    {voteOrderedData.map(expert => {
                        return (
                            <div className="expert-card">
                                <div className="votes-zone">
                                    <svg className="caret-up" height="11.859" viewBox="0 0 20.911 11.859" width="20.911"><path d="m20.3 24.75h-18.1a1.406 1.406 0 0 1 -.994-2.4l9.05-9.05a1.406 1.406 0 0 1 1.989 0l9.047 9.047a1.406 1.406 0 0 1 -.992 2.403z" fill="#6e6e6e" opacity=".278" transform="translate(-.794 -12.891)"/></svg>
                                    <div className="vote-count">{expert['votes']}</div>
                                    <caption className="tiny-caption">votes</caption>
                                    <CaretDown />
                                    {/* <svg className="caret-down" width="20.911" height="11.859" viewBox="0 0 20.911 11.859"><path d="M20.3,12.891H2.2a1.406,1.406,0,0,0-.994,2.4l9.047,9.047a1.406,1.406,0,0,0,1.989,0l9.047-9.047A1.406,1.406,0,0,0,20.3,12.891Z" fill="#6e6e6e" opacity=".278" transform="translate(-0.794 -12.891)"/></svg> */}
                                </div>
                                <div className="images-zone">
                                    <img className="main-image" src={placeholderImage} />
                                    <img className="sub-image" src={placeholderImage} />
                                    <img className="sub-image" src={placeholderImage} />
                                </div>
                                <div className="details-zone">
                                    <div className="business-title"><h4>{expert['name']}</h4><CommunityChecked /></div>
                                    <div className="tags">
                                        {expert['tags'].map(tagItem => {
                                            return <div className="tag-badge">{tagItem}</div>
                                        })}
                                    </div>
                                    <div className="location-list">
                                        <h6>Locations</h6>
                                        {expert['locations'].map(location => {
                                            return <div className="location">{location}</div>
                                        })}
                                    </div>
                                    <div className="website">
                                        <span rol="img">🌐</span>{expert['website']}
                                    </div>
                                    <div className="annotation-languages">

                                    </div>
                                </div>
                                <div className="action-zone">
                                    
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