import React from 'react';
import './expertDetail.css';

import placeholderImage from '../images/image-placeholder.png';

import { ReactComponent as BackArrowIcon} from '../images/icons/arrow-back.svg';
import { ReactComponent as CaretDown} from '../images/icons/caret-down.svg';
import { ReactComponent as CaretUp} from '../images/icons/caret-up.svg';
import { ReactComponent as EyeHideIcon} from '../images/icons/eye-hide.svg';
import { ReactComponent as EyeShowIcon} from '../images/icons/eye-show.svg';
import { ReactComponent as BookmarkIcon} from '../images/icons/bookmark.svg';
import { ReactComponent as AnnotateIcon} from '../images/icons/annotate.svg';
import { ReactComponent as CommunityChecked} from '../images/icons/check-circle.svg';

const expertsData = require('../expertsDirectory/experts.json');
const langFlagData = require('../expertsDirectory/langFlagByCode.json')



class ExpertDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flagHover: false,
        }
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
        let expert = null;
        expertsData.some(pro => {
            if (pro['id'] === this.props.match.params.id) {
                expert = pro;
                return true;
            } 
            return false;
        })
        console.log('expert: ', expert)
        const flagCaptionStyle = {
            display: this.state.flagHover ? 'block': 'none'
        }

        return (
            <div className="expertDetailContent">
                <div className="back-nav">
                    <a href='/directory'><BackArrowIcon /><p>Back</p></a>
                </div>
                <h2>Details Page</h2>
                <p>{this.props.match.params.id}</p>
                { expert ? (
                    <div className="expert-detail">
                        <div className="votes-zone">
                            <CaretUp className="caret-up" />
                            <div className="vote-count">{expert && expert['votes']}</div>
                            <figcaption className="tiny-caption">votes</figcaption>
                            <CaretDown className="caret-down"/>
                        </div>
                        <div className="images-zone">
                            <img className="main-image" alt={expert ? "image of " + expert['name']: ''} src={placeholderImage} />
                            <div>
                                <img className="sub-image" alt={expert ? "image of " + expert['name']: ''} src={placeholderImage} />
                                <img className="sub-image"  alt={expert ? "image of " + expert['name']: ''} src={placeholderImage} />
                            </div>
                        </div>
                        <div className="details-zone">
                            <div className="business-title">
                                <h2>{expert && expert['name']}</h2>{expert && expert['reviewed']?<CommunityChecked className="community-badge" />: null}
                            </div>
                            <div className="tags">
                                {expert && expert['tags'].map(tagItem => {
                                    return <div className="tag-badge">{tagItem}</div>
                                })}
                            </div>
                            <div className="locations">
                                <h6>Locations</h6>
                                <div className="location-list">
                                {expert && expert['locations'].map(location => {
                                    return <div className="location">{location}</div>
                                })}
                                </div>
                            </div>
                            <div className="website">
                                <span rol="img">🌐</span>{expert && expert['website']}
                            </div>
                            <div className="website-languages">
                                <h6>Website in</h6>
                                <div className="flag-list">{
                                    expert && expert['website-lang'].map(weblang => {
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
                                        expert && expert['annotation-info']['annotation-lang'].slice(0,3).map(annolang => {
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
                                    {expert && expert['annotation-info']['annotation-lang'].length > 3 ? 
                                    <div>
                                        <p className="remainder-lang">+{expert && expert['annotation-info']['annotation-lang'].length - 3}</p> 
                                        <div className="other-flags">{expert && expert['annotation-info']['annotation-lang'].slice(3).map(rest => {
                                        
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
                                    <h6>Last annotated by {expert && expert['annotation-info']['annotators'].slice(-1)[0][0]}</h6> {/* each annotator ["User Z", "2020-11-03T19:09:22GMT", "en"] */}
                                    <span>{langFlagData[expert && expert['annotation-info']['annotators'].slice(-1)[0][2]]['flagEmoji']? langFlagData[expert && expert['annotation-info']['annotators'].slice(-1)[0][2]]['flag']: <img src={langFlagData[expert && expert['annotation-info']['annotators'].slice(-1)[0][2]]['flag']}/>}</span>
                                </div>
                                <h6>On {new Date(expert && expert['annotation-info']['annotators'].slice(-1)[0][1]).toDateString()}</h6>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h3>Oops, looks like we don't have data on this particular business!</h3>
                )}
                
                
            </div>
            
        )
    }
}

export default ExpertDetail