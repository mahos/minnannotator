import React from 'react';
import './homeContent.css';

import placeholderImage from '../images/image-placeholder.png';
import heroImage from '../images/hero-people.png';
import  sponsorImage from '../images/sponsored.png';
import  resourceIconImage1 from '../images/resource-icon1.png';
import  resourceIconImage2 from '../images/resource-icon2.png';
import  resourceIconImage3 from '../images/resource-icon3.png';

import { ReactComponent as CaretDown} from '../images/icons/caret-down.svg';
import { ReactComponent as CaretUp} from '../images/icons/caret-up.svg';
import { ReactComponent as VoteIcon} from '../images/icons/vote-counter.svg';
import { ReactComponent as DictionaryIcon} from '../images/icons/dictionary.svg';
import { ReactComponent as BookmarkIcon} from '../images/icons/bookmark.svg';
import { ReactComponent as CommentIcon} from '../images/icons/comment.svg';
import { ReactComponent as CommentsIcon} from '../images/icons/comments.svg';
import { ReactComponent as AnnotateIcon} from '../images/icons/annotate.svg';
import { ReactComponent as LangToggleIcon} from '../images/icons/lang-toggle.svg';



const langFlagData = require('../expertsDirectory/langFlagByCode.json');
const resourceData = require('./resources.json');
const forumTopicData = require('./forumTopic.json');
const keywordsData = require('./keywords.json');
const experts = require('../expertsDirectory/fakeExperts.json');


const annotated = experts[experts.length - 1]; // needs to actually check if annotation exists and compare the time of last user annotation

function convertMilliSec(ms) {
    var yr, mo, d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    h = Math.floor(m / 60);
    d = Math.floor(h / 24);
    mo = Math.floor(d / 30);
    yr = Math.floor(mo / 12);
  
  
    var result = yr > 0 ? yr + ' years': mo > 0 ? mo + ' months': d > 0? d + ' days': h > 0 ? h + ' hr': m > 0 ? m + ' min': s + ' sec';
    return result;
};

class ToggleLang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.lang,
            showAll: true
        }
    }
    render() {
        return (
            <div className="toggler">
                <label>ALL</label>
                <div className="outside">
                    <div className="inside"></div>
                </div>
                <label>{langFlagData[this.state.lang]['flagEmoji']?langFlagData[this.state.lang]['flag']: ''}{this.state.lang.toUpperCase()}</label>

            </div>
        )
    }
    
}

class HomeContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: "en"
        }
    }

    render() {
        return (
            <div className="landing-contents">
                <div className="hero-area">
                    <div className="hero-cta">
                        <h2>Needing some legal protection in Japan?<br />
                        Join our community, get help, then use your 
                        experience to help others find the right legal support.</h2>
                        <button className="primary">Sign Up</button>
                        <a href=""><p>Read more about how the site works</p></a>
                    </div>
                    <div className="hero-image-container">
                        <img src={heroImage} />
                    </div>
                </div>
                <div className="things-to-do-list">
                    <h2>On Minnannotator, you can</h2>
                    <div className="row">
                        <div className="guide-panel-area">
                            <div className="each-panel">
                                <VoteIcon className="panel-icon"/>
                                <h4>Vote on resource usefulness</h4>
                            </div>
                            <div className="each-panel">
                                <LangToggleIcon className="panel-icon"/>
                                <h4>Browse in your first language</h4>
                            </div>
                            <div className="each-panel">
                                <BookmarkIcon className="panel-icon"/>
                                <h4>Bookmark legal resources and lawyers for future reference</h4>
                            </div>
                            <div className="each-panel">
                                <AnnotateIcon className="panel-icon"/>
                                <h4>Read, add and learn from community annotations of  legal websites in Japanese</h4>
                            </div>
                            <div className="each-panel">
                                <DictionaryIcon className="panel-icon"/>
                                <h4>Learn legal terminologies in Japanese and add more</h4>
                            </div>
                            <div className="each-panel">
                                <CommentIcon className="panel-icon"/>
                                <h4>Ask the community, share your experiences</h4>
                            </div>
                        </div>
                        <div className="sponsor">
                            <p>Sponsored Advertisement</p>
                            <img src={sponsorImage} />
                        </div>
                    </div>
                </div>
                <div className="ranking-panels-area">
                    <div className="top-resource-panel panel">
                        <div className="panel-head">
                            <h2 className="panel-title">Top Resources</h2>
                            <ToggleLang className="toggler" lang="en"/>
                        </div>
                        <div className="resource-list">
                            {resourceData.slice(0,3).map((resource, index) => {
                                return (<div className="resource-card">
                                    <div className="card-image-container">
                                        {index == 0 ? <img src={resourceIconImage1} /> : index ==1 ? <img src={resourceIconImage2} /> : <img src={resourceIconImage3} />}
                                        {/* <img src={resourceIconImage2} /> */}
                                    </div>
                                    <div className="resource-info">
                                        <h3><div>{index + 1}</div>{resource['website']}</h3>
                                        <div className="topic-tags">
                                            {resource['tags'].map(tag => {
                                                return (<div className="small-tag">{tag}</div>)
                                            })}
                                        </div>
                                    </div>
                                    <div className="votes-zone">
                                        <CaretUp className="caret-up control"/>
                                        <div className="vote-count">{resource['allVotes']}</div>
                                        <figcaption className="tiny-caption">votes</figcaption>
                                        <CaretDown className="caret-down control"/>
                                    </div>
                                </div>)
                            })}
                        </div>
                        <a className="more-link" href="#">More</a>
                    </div>
                    <div className="forum-topic-panel panel">
                        <div className="panel-head">
                            <h2 className="panel-title">Hot Forum Topic</h2>
                        </div>
                        <div className="topic-list">
                            {forumTopicData.slice(0,3).map((topic, index) => {
                                return (<div className="topic-card">
                                    <div className="topic-rank">{index + 1}</div>
                                    <div className="topic-info">
                                        <h3>{topic['title']}</h3>
                                        <h6>Posted by {topic['opener']} {convertMilliSec(new Date() - new Date(topic['timestamp']))} ago</h6>
                                    </div>
                                    <div className="interest-zone">
                                        <div className="bookmarks">
                                            <BookmarkIcon className="bookmark-icon icon"/>
                                            <div class="interest-stat">
                                                <div className="bookmark-count count">{topic['bookmarks']}</div>
                                                <figcaption className="tiny-caption">Bookmarked</figcaption>
                                            </div>
                                        </div>
                                        <div className="comments">
                                            <CommentsIcon className="comments-icon icon"/>
                                            <div class="interest-stat">
                                                <div className="comment-count count">{topic['comments']}</div>
                                                <figcaption className="tiny-caption">Comments</figcaption>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            })}
                        </div>
                        <a href="#">More</a>
                    </div>
                    <div className="recently-annotated-panel panel">
                        <h2 className="panel-title">Recently Annotated</h2>
                        <a href={'./detail/' + annotated['id']}>
                        <div className="annotated-card">
                            <div className="card-image-container">
                                <img src={placeholderImage} />
                            </div>
                            <div className="basic-info">
                                <h3>{annotated['website']}</h3>
                                <div className="practice-tags">
                                    {annotated['tags'].map(tag => {
                                        return (<div className="tag">{tag}</div>)
                                    })}
                                </div>
                                <h6>Annotation by {annotated['annotation-info']['annotators'][annotated['annotation-info']['annotators'].length - 1][0]} {langFlagData[annotated['annotation-info']['annotators'][annotated['annotation-info']['annotators'].length - 1][2]]['flagEmoji'] ? langFlagData[annotated['annotation-info']['annotators'][annotated['annotation-info']['annotators'].length - 1][2]]['flag'] : ''}</h6>
                            </div>
                            <div className="annotation-lang">
                                <h6>Annotation in</h6>
                                {annotated['annotation-info']['annotation-lang'].slice(0,3).map(lang => {
                                    if (langFlagData[lang]['flagEmoji']) {
                                        return <div>{langFlagData[lang]['flag']}</div>
                                    } else {
                                        return <div>{lang}</div>
                                    }
                                    
                                })}
                            </div>
                        </div>
                        </a>
                        <a href="#">More</a>
                    </div>
                    <div className="popular-keywords-panel panel">
                        <div className="panel-head">
                            <h2 className="panel-title">Popular Keywords</h2>
                            <ToggleLang lang="en"/>
                        </div>
                        <div className="keywords">
                        {keywordsData.slice(0,3).map(word => {
                            console.log('Word: ', word);
                            return (<div className="word-zone">
                                <h6 className="rubi">{word['rubi']}</h6>
                                <h3>{word['japanese']}</h3>
                                <h4>{word['pronunciation']}</h4>
                                <div className="add-dict-cta">
                                    <div className="add-icon">+</div>
                                    <h6>add to my <br/>dictionary</h6>
                                </div>
                                <div className="translate-tooltip">
                                    {word['translations'][this.state.lang].map(definition => {
                                        return (
                                            <div className="each-def">
                                                <div className="votes-zone">
                                                    <CaretUp className="caret-up control"/>
                                                    <div className="vote-count">{definition['votes']}</div>
                                                    <figcaption className="tiny-caption">votes</figcaption>
                                                    <CaretDown className="caret-down control"/>
                                                </div>
                                                <p>{definition['meaning']}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>)
                        })}
                        </div>
                        <a className="more-link" href="#">More</a>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default HomeContent