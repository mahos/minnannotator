import React from 'react';
import './App.css';
import { Router, BrowserRouter } from 'react-router-dom';
import history from './utilities/history';
import Routes from './routes/index';

import LogoImage from './images/logo.png';

const langFlagData = require('./expertsDirectory/langFlagByCode.json')

const availableLang = ['en', 'ja', 'zho', 'vi', 'ru', 'ko', 'si']
const langOptions = [];
availableLang.forEach(lang => {
  langOptions.push(langFlagData[lang])
})

function App() {
  let nowAt = window.location.href.split('/')[3]
  console.log('now at: ', nowAt);
  return (
    <div className="App">
      <nav>
        <div className="logo-area">
          
          <a href="/"><img src={LogoImage} />Minnannotator</a>
        </div>
        <div className="nav-links">
          <ul>
            <a href="./directory" className={nowAt == 'directory'? 'active': ''}><li>Look for Experts</li></a>
            <a className="not-ready"><li >Forums</li></a>
            <a className="not-ready"><li>Resources</li></a>
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
        {/* <Router basename="/minnannotator" history={history}>
          <Routes />
        </Router> */}
        <BrowserRouter basename="/minnannotator">
          <Routes />
        </BrowserRouter>
      </div>
      <footer>
        <h6>Minnannotator © 2020 All Rights Reserved</h6>
      </footer>


    </div>
  );
}

export default App;
