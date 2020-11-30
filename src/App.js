import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapFilter from './expertsDirectory/mapFilter';
import ExpertsDirectory from './expertsDirectory/expertsDirectory';

function App() {
  return (
    <div className="App">
      <ExpertsDirectory />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>this is me editing</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
