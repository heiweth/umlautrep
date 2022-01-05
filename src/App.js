import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { API } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import { useTable } from 'react-table'

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function SensorTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  // Render the UI for your table
  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px red",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold"
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: "papayawhip",
                      color: "black",

                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function SensorContainer() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    fetch("https://xs4p80dihg.execute-api.eu-west-1.amazonaws.com/dev/hello")
      .then(response => {
        return response.json()
      })
      .then(data => {
        const requiredDataFromResponse = data.body;
        console.log(data.body);
        const datat = requiredDataFromResponse.map(eachSensorItem => ({
          id: eachSensorItem.date,
          name: eachSensorItem.type_of_calculation,
          serialNum: eachSensorItem.aggregation_level,
          status: eachSensorItem.OPM_AREA,
          dsdr: eachSensorItem["Data Service Drop Rate (3G/4G)"]
        }));
        setSensors(datat)
      })
      .catch(error => {
        setSensors([]); // reset the [] here - this is optional and is based on expected behaviour
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(true);
    fetchData()
  }, []);


  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "id" // accessor is the "key" in the data
      },
      {
        Header: "Type of Calculation",
        accessor: "name"
      },
      {
        Header: "Aggregation Level",
        accessor: "serialNum"
      },
      {
        Header: "OPM_AREA",
        accessor: "status"
      },
      {
        Header: "Data Service Drop Rate (3G/4G)",
        accessor: "dsdr"
      }
    ],
    []
  );

  if (sensors.length === 0 && !loading) {
    return <div>No Senors data available</div>;
  }

  return (
    <div>
      {loading && <span>Please wait we are fetching data</span>}
      <SensorTable columns={columns} data={sensors} />
    </div>
  );
}

function App() {
  return (
    <div className="App">
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <Authenticator loginMechanisms={['username']}>
      {({ signOut, user }) => (
        <main>
            <h1>Merry Xmas {user.username}</h1><button onClick={signOut}>Sign out</button>
            <SensorContainer />
        </main>
      )}
    </Authenticator>
    </header>
    </div>
  );
}


export default App;
