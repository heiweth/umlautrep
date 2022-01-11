import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { API } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import SensorContainer from './Table.js';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
    <Authenticator loginMechanisms={['username']}>
      {({ signOut, user }) => (
        <main>
                <h1>Merry Xmas {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
           <div className="container">
                <SensorContainer />
            </div>
        </main>
      )}
    </Authenticator>

    </div>
  );
}


export default App;
