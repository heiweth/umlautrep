import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { API } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import SensorContainer from './Table.js';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


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
