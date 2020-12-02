import React from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import history from './utilities/history';
import Routes from './routes/index';

import HomeContent from './homeContent/homeContent';
import ExpertsDirectory from './expertsDirectory/expertsDirectory';
const langFlagData = require('./expertsDirectory/langFlagByCode.json')

const availableLang = ['en', 'ja', 'zho', 'vi', 'ru', 'ko', 'si']
const langOptions = [];
availableLang.forEach(lang => {
  langOptions.push(langFlagData[lang])
})

function App() {
  return (
    <div className="App">
      <nav>
        <div className="logo-area">
          <a href="/">Minnannotator</a>
        </div>
        <div className="nav-links">
          <ul>
            <a href="./directory"><li>Look for Experts</li></a>
            <li>Forums</li>
            <li>Resources</li>
          </ul>
        </div>
        <div className="nav-right">
          <div className="setup-options">
            <select className="lang-select">
              {langOptions.map(lang => {
                return <option>{lang['flagEmoji']? lang['flag']: ''} {lang['langName']}</option>
              })}
            </select>
          </div>
          <div className="authentication">
            <button className="primary">Sign Up</button>
            <button className="secondary">Log In</button>
          </div>
        </div>
      </nav>
      <div className="content">
        <Router history={history}>
          <Routes />
        </Router>
        {/* <HomeContent /> */}
        {/* <ExpertsDirectory /> */}
      </div>
      <footer>
        <h6>Minnannotator © 2020 All Rights Reserved</h6>
      </footer>


    </div>
  );
}

export default App;
