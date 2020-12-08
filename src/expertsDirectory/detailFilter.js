import React from 'react';
import './detailFilter.css';
import _ from 'lodash';

class FilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.state = {
            friendliness: [],
            serviceType: [],
            practiceArea: [],
            source: [],
            test1: {
                'subtitle': true
            },
            test2: false,
            test3: '',
            checkFieldsState: {
                'Non-Japanese Friendliness': {
                    'Community reviewed': false,
                    'Has website' : false,
                    'Multi-lingual': false,
                    'More than 50 upvotes': false,
                    'Offers free consultation': false,
                    'Translator available': false,
                    'Online consultation available': false
                },
                'Legal Service / Type': {
                    'Attorney': false,
                    'Judicial Scrivener' : false,
                    'Patent Agent': false,
                    'Administrative Scrivener': false
                },
                'Practice Areas': {
                    'Arbitration and Mediation': false,
                    'Asset Finance Law': false,
                    'Banking and Finance': false,
                    'Capital Markets': false,
                    'Constructions Law': false,
                    'Corporate Compliance': false,
                    'Criminal Defense': false,
                    'Entertainment Law': false,
                    'Insurance Law': false,
                    'Intellectual Property': false,
                    'International Arbitration': false,
                    'International Business': false,
                    'Labor and Employment': false,
                    'Litigation': false,
                    'Private Equity and Funds': false,
                    'Real Estate': false,
                    'Technology': false,
                    'Venture Capital Law': false
                },
                'Result Source':  {
                    'sumline.jp': false,
                    'HG.org': false,
                    'bengoshikai.jp': false,
                    'legal.coconala.com': false
                }
            }
        }
        
    }

    handleSubmit(checks) {
        let optionDict = {}
        console.log('detail form submission happening - ', checks);
        // this.setState({checkFieldsState: checks})
        Object.entries(checks).forEach(type => {
            // typeVal obj in type[1]
            if (type[0] === "Non-Japanese Friendliness") {
                let generalReq = []
                Object.entries(type[1]).forEach(checkfield => {
                    if (checkfield[1]) {
                        generalReq.push(checkfield[0])
                    }
                })
                if (generalReq.length) {
                    optionDict["general"] = generalReq;
                } else {
                    delete optionDict["general"];
                }
            } else if (type[0] === "Legal Service / Type") {
                let serviceReq = []
                Object.entries(type[1]).forEach(checkfield => {
                    if (checkfield[1]) {
                        serviceReq.push(checkfield[0])
                    }
                })
                if (serviceReq.length) {
                    optionDict["service-type"] = serviceReq;
                } else {
                    delete optionDict["service-type"];
                }
            } else if (type[0] === "Practice Areas") {
                let specialtyReq = []
                Object.entries(type[1]).forEach(checkfield => {
                    if (checkfield[1]) {
                        specialtyReq.push(checkfield[0])
                    }
                })
                if (specialtyReq.length) {
                    optionDict["specialty"] = specialtyReq;
                } else {
                    delete optionDict["specialty"];
                }
            } else {
                let sourceReq = []
                Object.entries(type[1]).forEach(checkfield => {
                    if (checkfield[1]) {
                        sourceReq.push(checkfield[0])
                    }
                })
                if (sourceReq.length) {
                    optionDict["existsIn"] = sourceReq;
                } else {
                    delete optionDict["existsIn"];
                }
            }
            
        }) 
        console.log('optionDict: ', optionDict);
    
        this.props.onFilterApply(optionDict);
    }
    handleReset() {
        console.log('resetting detail form...');
        const cleared = {
            'Non-Japanese Friendliness': {
                'Community reviewed': false,
                'Has website' : false,
                'Multi-lingual': false,
                'More than 50 upvotes': false,
                'Offers free consultation': false,
                'Translator available': false,
                'Online consultation available': false
            },
            'Legal Service / Type': {
                'Attorney': false,
                'Judicial Scrivener' : false,
                'Patent Agent': false,
                'Administrative Scrivener': false
            },
            'Practice Areas': {
                'Arbitration and Mediation': false,
                'Asset Finance Law': false,
                'Banking and Finance': false,
                'Capital Markets': false,
                'Constructions Law': false,
                'Corporate Compliance': false,
                'Criminal Defense': false,
                'Entertainment Law': false,
                'Insurance Law': false,
                'Intellectual Property': false,
                'International Arbitration': false,
                'International Business': false,
                'Labor and Employment': false,
                'Litigation': false,
                'Private Equity and Funds': false,
                'Real Estate': false,
                'Technology': false,
                'Venture Capital Law': false
            },
            'Result Source':  {
                'sumline.jp': false,
                'HG.org': false,
                'bengoshikai.jp': false,
                'legal.coconala.com': false
            }
        }
        this.setState({checkFieldsState: cleared}, ()=> {
            console.log('cleared this.state.checkfieldsState: ', this.state.checkFieldsState)
        })
        
        this.props.onFilterApply({})
    }

    handleCheck(type, field) {
        let checkFieldsStateTemp = this.state.checkFieldsState;
        console.log('handling check: ', type, ' : ', field)
        console.log('current state- ', `${type}[${field}]`, ": ", this.state.checkFieldsState[type][field])
        // this.setState({[`checkFieldsState[${type}][${field}]`]: !this.state.checkFieldsState[type][field]})
        // this.setState({checkFieldsState: {[type]: {[field]: !this.state.checkFieldsState[type][field]}}}, ()=>{
        //     console.log('after state- ',`${type}[${field}]`, ": ", this.state.checkFieldsState[type][field])
        // })
        // this.setState({[`checkFieldsState.${type}.${field}`]: true}, ()=>{
        //     console.log('after state- ',`${type}[${field}]`, ": ", this.state.checkFieldsState[type][field])
        // })
        console.log('temp checkfield; ', checkFieldsStateTemp)
        Object.entries(this.state.checkFieldsState).forEach(fieldType => {
            if (fieldType[0] === type) {
                Object.entries(fieldType[1]).forEach(fieldEntry => {
                    if (fieldEntry[0] === field) {
                        console.log('!!!!!!!!!!!!!match at', type, field)
                        console.log('switching fieldEntry stat from', fieldEntry)
                        checkFieldsStateTemp[type][field] = !fieldEntry[1]
                        console.log('switching fieldEntry stat to', checkFieldsStateTemp[type][field])
                    }
                })
            }
        })
        this.setState({checkFieldsState: checkFieldsStateTemp})
        this.setState({test3: 'wahs'}, ()=>{
            console.log('state: ', this.state);
        })

    }
    render () {
        console.log('rendering')
        // let checkFields = this.state.checkFieldsState;
        // let checkFields = {
        //     'Non-Japanese Friendliness': {
        //         'Community reviewed': false,
        //         'Has website' : false,
        //         'Multi-lingual': false,
        //         'More than 50 upvotes': false,
        //         'Offers free consultation': false,
        //         'Translator available': false,
        //         'Online consultation available': false
        //     },
        //     'Legal Service / Type': {
        //         'Attorney': false,
        //         'Judicial Scrivener' : false,
        //         'Patent Agent': false,
        //         'Administrative Scrivener': false
        //     },
        //     'Practice Areas': {
        //         'Arbitration and Mediation': false,
        //         'Asset Finance Law': false,
        //         'Banking and Finance': false,
        //         'Capital Markets': false,
        //         'Constructions Law': false,
        //         'Corporate Compliance': false,
        //         'Criminal Defense': false,
        //         'Entertainment Law': false,
        //         'Insurance Law': false,
        //         'Intellectual Property': false,
        //         'International Arbitration': false,
        //         'International Business': false,
        //         'Labor and Employment': false,
        //         'Litigation': false,
        //         'Private Equity and Funds': false,
        //         'Real Estate': false,
        //         'Technology': false,
        //         'Venture Capital Law': false
        //     },
        //     'Result Source':  {
        //         'sumline.jp': false,
        //         'HG.org': false,
        //         'bengoshikai.jp': false,
        //         'legal.coconala.com': false
        //     }
        // }

        return (
            <div className="detail-form">
                <div className="form-action-buttons">
                    <button onClick={() => {this.handleSubmit(this.state.checkFieldsState)}} className="primary">Apply Filter</button>
                    <button onClick={this.handleReset} className="secondary">Reset Filter</button>
                </div>
                <div className="checkbox-area">
                    {/* {Object.entries(checkFields).map(item => { */}
                    {Object.entries(this.state.checkFieldsState).map(item => {
                        // console.log('item: ', item);
                        return (
                        <div className="checkgroup">
                            <h4>{item[0]}</h4>
                            <ul className="checklist">
                                {Object.entries(item[1]).map(checkfield => {
                                   return  (
                                    <div>
                                        {/* <input type="checkbox" name={checkfield[0]} value={checkfield[0]} defaultChecked={checkfield[1]}/> */}
                                        <input type="checkbox" onChange={() => this.handleCheck(item[0], checkfield[0])} name={checkfield[0]} value={checkfield[0]} checked={checkfield[1]}/>
                                        <label>{checkfield[0]}</label>
                                    </div>
                                    )
                                })}
                            </ul>
                        </div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}

export default FilterForm