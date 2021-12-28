import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { API } from 'aws-amplify';
import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App() {
//  const response = await API.get('pythonapi', '/hello');
  const [users, setUsers] = useState([])

  const fetchData = async () => {
    const response = await API.get('pythonapi', '/hello')
    const data = response.body
    setUsers(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="App">
    <Authenticator loginMechanisms={['username']}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>xmas</h1>
            <div>
              {users.length > 0 && (
                <ul>
                  {users}
                </ul>
              )}
            </div>
          </header>
        </main>
      )}
    </Authenticator>
    </div>
  );
}

export default App;
