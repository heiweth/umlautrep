import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { API } from 'aws-amplify';

function App() {
  const [greeting, setGreeting] = useState(null)
  async function fetchGreeting() {
   const response = await API.get('pythonapi', '/hello');
   setGreeting(response.message)
  }
  useEffect(() => {
    fetchGreeting()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>grneeeg</h1>
        <h1>{greeting}</h1>
      </header>
    </div>
  );
}

export default App;
