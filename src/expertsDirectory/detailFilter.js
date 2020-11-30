import React from 'react';
import './detailFilter.css';

class FilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendliness: [],
            serviceType: [],
            practiceArea: [],
            source: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit() {
        console.log('detail form submission happening');
    }
    handleReset() {
        console.log('resetting detail form...');
    }
    render () {
        const checkFields = {
            friendliness: {
                'Community reviewed': false,
                'Has website' : false,
                'Multi-lingual': false,
                'More than 50 upvotes': false,
                'Offers free consultation': false,
                'Translator available': false,
                'Online consultation available': false
            },
            serviceType: {
                'Attorney': false,
                'Judicial Scrivener' : false,
                'Patent Agent': false,
                'Administrative Scrivener': false
            },
            practiceArea: {
                'Arbitration and Mediation': false,
                'Asset Finance Law': false,
                'Banking and Finance': false,
                'Capital Markets': false,
                'Constructions Law': false,
                'Corportate Compliance': false,
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
            source:  {
                'sumline.jp': false,
                'HG.org': false,
                'bengoshikai.jp/himawari search': false,
                'legal.coconala.com': false
            }
        }
        const checkFields2 = [
            'test', 'test2', 'test3'
        ]
        return (
            <div className="detail-form">
                <div className="form-action-buttons">
                    <button onClick={this.handleSubmit} className="primary">Apply Filter</button>
                    <button onClick={this.handleReset} className="secondary">Reset Filter</button>
                </div>
                <div className="checkbox-area">
                    {Object.entries(checkFields).map(item => {
                        console.log('item: ', item);
                        return (
                        <div className="checkgroup">
                            <h4>{item[0]}</h4>
                            <ul className="checklist">
                                {Object.entries(item[1]).map(checkfield => {
                                   return  (
                                    <div>
                                        <input type="checkbox" name={checkfield[0]} value={checkfield[0]} defaultChecked={checkfield[1]}/>
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