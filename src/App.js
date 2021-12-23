import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { API } from 'aws-amplify';

const response = await API.get('pythonapi', '/hello');
function App() {
  const response = await API.get('pythonapi', '/hello');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>grng</h1>
      </header>
    </div>
  );
}

export default App;
