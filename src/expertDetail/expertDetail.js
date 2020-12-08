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
import { ReactComponent as InternetIcon} from '../images/icons/www.svg';
import { ReactComponent as PhoneIcon} from '../images/icons/phone.svg';
import { ReactComponent as FaxIcon} from '../images/icons/fax.svg';

const expertsData = require('../expertsDirectory/fakeExperts.json');
const langFlagData = require('../expertsDirectory/langFlagByCode.json')

// class LoadedScreenshot extends React.Component {
//     constructor(props) {
//             super(props);
//     }
//     render() {
//         console.log('inside loaded screenshot component: ', this.props.source);
//         return (
//             <div>
//                 <img className="screenshot-in-view" src={this.props.source} />
//             </div>)
//     }
// }


class ExpertDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flagHover: false,
            hideAnnotation: true,
            expert: null,
            currentlyViewing: '',
            imageRootPath: ''

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

    handleToggleAnnoView() {
        this.setState({hideAnnotation: !this.state.hideAnnotation});
        let newView
        console.log('pop-', this.state.currentlyViewing.split('/').pop());
        console.log('this.state.currentlyViewing: ', this.state.currentlyViewing)
        let imageFile = this.state.currentlyViewing.split('/').pop();

        if (this.state.hideAnnotation) {
            newView = this.state.imageRootPath + '/screenshots/annotated/' + imageFile;
        } else {
            newView = this.state.imageRootPath + '/screenshots/' + imageFile;
        }

        this.setState({currentlyViewing: newView});
        
    }

    componentDidMount() {
        console.log('details mounted!')
        console.log('this.props params: ', this.props.match.params.id);
        expertsData.some(pro => {
            if (pro['id'] === this.props.match.params.id) {
                this.setState({expert: pro});
                if (process.env.PUBLIC_URL) {
                    this.state.currentlyViewing = `${process.env.PUBLIC_URL}/mockData/` + this.props.match.params.id + '/screenshots/' + pro['annotation-info']['screenshots'][0]['image-url'];
                    this.state.imageRootPath = `${process.env.PUBLIC_URL}/mockData/` + this.props.match.params.id + '/';
                } else {
                    this.state.currentlyViewing = `https://mahos.github.io/minnannotator/public/mockData/` + this.props.match.params.id + '/screenshots/' + pro['annotation-info']['screenshots'][0]['image-url'];
                    this.state.imageRootPath = `https://mahos.github.io/minnannotator/public/mockData/` + this.props.match.params.id + '/';
                }
                // this.state.currentlyViewing = `${process.env.PUBLIC_URL}/mockData/` + this.props.match.params.id + '/screenshots/' + pro['annotation-info']['screenshots'][0]['image-url'];
                // this.state.imageRootPath = `${process.env.PUBLIC_URL}/mockData/` + this.props.match.params.id + '/';
                return true;
            } 
            return false;
        })
    }

    render() {
        console.log('what is expert: ', this.state.expert)
        console.log('image url: ', this.state.currentlyViewing);
        const flagCaptionStyle = {
            display: this.state.flagHover ? 'block': 'none'
        }
        

        return (
            <div className="expert-detail-content">
                <div className="back-nav">
                    <a href='../directory'><BackArrowIcon /><p>Back</p></a>
                </div>
                { this.state.expert? (
                    <div className="expert-detail">
                        <div className="votes-zone">
                            <CaretUp className="caret-up" />
                            <div className="vote-count">{this.state.expert&& this.state.expert['votes']}</div>
                            <figcaption className="tiny-caption">votes</figcaption>
                            <CaretDown className="caret-down"/>
                        </div>
                        <div className="images-zone">
                            <img className="main-image" alt={this.state.expert? "image of " + this.state.expert['name']: ''} src={this.state.expert['images'][0] ? this.state.imageRootPath + this.state.expert['images'][1] : placeholderImage} />
                            <div>
                                <img className="sub-image" alt={this.state.expert? "image of " + this.state.expert['name']: ''} src={this.state.expert['images'][1] ? this.state.imageRootPath + this.state.expert['images'][0] : placeholderImage}  />
                                <img className="sub-image"  alt={this.state.expert? "image of " + this.state.expert['name']: ''} src={this.state.expert['images'][2] ? this.state.imageRootPath + this.state.expert['images'][2] : placeholderImage}  />
                            </div>
                        </div>
                        <div className="details-zone">
                            <div className="bookmark-area">
                                <h6>Add to Bookmark</h6><BookmarkIcon />
                            </div>
                            <div className="business-title">
                                <h2>{this.state.expert&& this.state.expert['name']}</h2>{this.state.expert && this.state.expert['reviewed']?<CommunityChecked className="community-badge" />: null}
                            </div>
                            <div className="tags">
                                {this.state.expert&& this.state.expert['tags'].map(tagItem => {
                                    return <div className="tag-badge">{tagItem}</div>
                                })}
                            </div>
                            <div className="locations">
                                <h6>Locations</h6>
                                <div className="location-list">
                                {this.state.expert&& this.state.expert['locations'].map(location => {
                                    return <div className="location">{location}</div>
                                })}
                                </div>
                            </div>
                            <div className="expert-languages">
                                <h6>Service available in</h6>
                                <div className="flag-list">{
                                    this.state.expert['languages'].map(explang => {
                                        if (langFlagData[explang]['flagEmoji']){
                                            return (
                                                <div className="flag-icon">
                                                    <p onMouseOver={this.handleFlagMouseEnter.bind(this)} onMouseOut={this.handleFlagMouseExit.bind(this)}>{langFlagData[explang]['flag']}</p>
                                                    <figcaption style={flagCaptionStyle} className="subcaption">{langFlagData[explang]['langName']}</figcaption>
                                                </div>
                                                
                                            )
                                        } else {
                                            return (
                                                <div className="flag-icon">
                                                    <img onMouseOver={this.handleFlagMouseEnter.bind(this)} onMouseOut={this.handleFlagMouseExit.bind(this)} src={langFlagData[explang]['flag']} />
                                                    <figcaption style={flagCaptionStyle} className="subcaption">{langFlagData[explang]['langName']}</figcaption>
                                                    
                                                </div>
                                                
                                            )
                                        }
                                        
                                    })
                                }
                                </div>
                            </div>
                            <div className="connect">
                                <div className="website">
                                    {this.state.expert['website'].length > 0 ? 
                                    <div><InternetIcon className="icon www-icon" /><span>{this.state.expert && this.state.expert['website']}</span></div> :
                                    <h6>No website available</h6>
                                    }
                                </div>
                                <div className="phones">
                                    <div><PhoneIcon className="icon phone-icon"/><span>{this.state.expert && this.state.expert['fax']}</span></div>
                                    <div><FaxIcon className="icon fax-icon"/><span>{this.state.expert && this.state.expert['phone']}</span></div>
                                </div>
                            </div>
                            {this.state.expert['website'].length > 0 ? 
                                <div className="website-languages">
                                    <h6>Website in</h6>
                                    <div className="flag-list">{
                                        this.state.expert&& this.state.expert['website-lang'].map(weblang => {
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
                            : <div><br /><br /></div>}
                            {this.state.expert['annotation-info']['history'].length > 0 ? 
                            <div>
                                <div className="annotation-languages">
                                    <h6>Review annotation available in</h6>
                                    <div className="flag-list"> 
                                        {
                                            this.state.expert && this.state.expert['annotation-info'] && this.state.expert['annotation-info']['annotation-lang'].slice(0,3).map(annolang => {
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
                                        {this.state.expert && this.state.expert['annotation-info'] && this.state.expert['annotation-info']['annotation-lang'].length > 3 ? 
                                        <div>
                                            <p className="remainder-lang">+{this.state.expert&& this.state.expert['annotation-info']['annotation-lang'].length - 3}</p> 
                                            <div className="other-flags">{this.state.expert&& this.state.expert['annotation-info']['annotation-lang'].slice(3).map(rest => {
                                            
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
                                    {this.state.expert && this.state.expert['annotation-info'] ? (
                                    <div>
                                        <div className="user-info">
                                            <h6>Last annotated by {this.state.expert&& this.state.expert['annotation-info']['annotators'].slice(-1)[0][0]}</h6> {/* each annotator ["User Z", "2020-11-03T19:09:22GMT", "en"] */}
                                            <span>{langFlagData[this.state.expert&& this.state.expert['annotation-info']['annotators'].slice(-1)[0][2]]['flagEmoji']? langFlagData[this.state.expert&& this.state.expert['annotation-info']['annotators'].slice(-1)[0][2]]['flag']: <img src={langFlagData[this.state.expert&& this.state.expert['annotation-info']['annotators'].slice(-1)[0][2]]['flag']}/>}</span>
                                        </div>
                                        <h6>On {new Date(this.state.expert && this.state.expert['annotation-info']['annotators'].slice(-1)[0][1]).toDateString()}</h6>
                                    </div>
                                    ) : (
                                        <p>Unfortunately, annotation information is unavailable at the moment.</p>
                                    )}
                                </div>
                            </div>
                            : <h6>No one has annotated this professional yet.</h6>}
                        </div>
                    </div>
                ) : (
                    <h3>Oops, looks like we don't have data on this particular business!</h3>
                )}
                {this.state.expert && this.state.expert['annotation-info'] ? (
                <div className="annotation-zone">
                    <div className="annotation-edit-tools">
                        <div className="anno-lang-option">
                            <div className="toggle-anno-view">
                                {this.state.hideAnnotation ? <EyeShowIcon className="eyecon" onClick={this.handleToggleAnnoView.bind(this)} />:<EyeHideIcon className="eyecon" onClick={this.handleToggleAnnoView.bind(this)}/>}<span>{this.state.hideAnnotation? 'Show': 'Hide'} Annotation</span>
                            </div>
                            <select>
                                {this.state.expert? this.state.expert['annotation-info']['annotation-lang'].map(lang => {
                                    console.log('annotation available in lang: ', lang);
                                    return (
                                        <option>{langFlagData[lang]['flag']}</option>
                                    )
                                }):''}
                            </select>
                        </div>
                        <div className="toggle-popular-anno" >
                            <div className="check-box-area">
                                <label>
                                    <input type="checkbox"></input>
                                    Hide Annotation with votes under
                                </label>
                            </div>
                            <div className="toggle-popular">
                                    <input type="number" min="0" max="999" defaultValue="0" step="1"/>
                                </div>
                        </div>
                        <div className="edit-annotation">
                             <AnnotateIcon className="icon" />Add/Edit your annotation
                        </div>
                    </div>
                    <div className="document">
                        {this.state.expert && this.state.expert['annotation-info'] && this.state.expert['annotation-info']['screenshots'].length > 0 ? 
                        // <img className="annotated" src={this.state.currentlyViewing}/> 
                        <div>
                            {/* <LoadedScreenshot source={this.state.currentlyViewing} /> */}
                            <img className="annotated" src={this.state.expert['annotation-info']['screenshots'][0]['image-url']? `${this.state.currentlyViewing}`: placeholderImage} />
                        </div>
                        : <p>looks like nobody submitted an annotation for this business! Be the first to do so!</p>}
                    </div>
                
                    <div className="annotation-more-info">
                        <div className="participant-history">
                            <h4>Participant History</h4>
                                {this.state.expert && this.state.expert['annotation-info'] ? this.state.expert['annotation-info']['history'].map(user => {
                                    return (
                                        <div className="annotator-info">
                                            <div className="annotator-action"><img src={placeholderImage}/>{user[0]} {user[2]} on this expert</div>
                                            <div className="annotation-ts">{user[1]}</div>
                                        </div>
                                    )
                                }): ''}
                        </div>
                        <div className="other-annotations">
                                {this.state.expert? this.state.expert['annotation-info']['screenshots'].reverse().map(page => {
                                    return (
                                        <div className="annotated-page">
                                            <img src={page['image-url'] !== '' ? this.state.imageRootPath + 'screenshots/' + page['image-url']: placeholderImage} />
                                            <div className="page-info">
                                                <h4>{page['title']}</h4>
                                                <p>{page['description']}</p>
                                            </div>
                                        </div>
                                    )
                                }): ''}
                        </div>
                    </div>
                </div>) : (<p>Looks like we don't have an annotation yet for this legal professional.</p>)}
            </div>
            
        )
    }
}

export default ExpertDetail