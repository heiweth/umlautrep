import React, { useState, useEffect } from 'react';
import { useTable, useFilters, useSortBy} from 'react-table'
import { ColumnFilter } from './components/ColumnFilter.js'
import { Line } from 'react-chartjs-2';


function SensorTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data },
    useFilters,
    useSortBy,
  );

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ▼'
                        : ' ▲'
                      : ''}
                  </span>
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
                  <td {...cell.getCellProps()}>
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
  const [columns, setColumns] = useState([]);
  const [typeOfCalc, setType] = useState([]);
  const [aggLvl, setAggLvl] = useState([]);
  const [Chartloading, setChartLoading] = useState(false);
  const [dataChart, setDataChart] = useState({});


  const fetchData = () => {
    fetch("https://xs4p80dihg.execute-api.eu-west-1.amazonaws.com/dev/hello")
      .then(response => {
        return response.json()
      })
      .then(data => {
        const requiredDataFromResponse = data.body;
        const optionType = requiredDataFromResponse.map((eachSensorItem) => ({
            type: eachSensorItem.type_of_calculation,
            agglvl: eachSensorItem.aggregation_level,
            date: eachSensorItem.date,
            erab: eachSensorItem["VoLTE E-RAB (QCI1) Success Rate (Voice) (%)"],
        }))

        console.log(optionType[0])
        let types = []
        let agg_lvl = []
        let dates = []
        let erab = []
        optionType.forEach(t => {
            types.push(t['type'])
            agg_lvl.push(t['agglvl'])
            dates.push(t['date'])
            erab.push(t['erab'])
        })
        let uniq_types = new Set(types)
        let uniq_lvl = new Set(agg_lvl)
        let utypes = []
        let uagg_lvl = []
        uniq_types.forEach(typ => {
            utypes.push({
                type: typ
            })
        })
        uniq_lvl.forEach(lvl => {
           uagg_lvl.push({
                level: lvl
            })
        })
        setType(utypes)
        setAggLvl(uagg_lvl)

        setDataChart({
                labels: dates,
                datasets: [{
                    fill: false,
                    borderColor: "#742774",
                    label: 'Confirmed cases',
                    data:  erab,
                }]
        })
        setSensors(requiredDataFromResponse)
        let columns = [];
        let headers = data.columns;
        headers.forEach(header => {
         columns.push({
            Header: header,
            accessor: header.toString(),
            sortType: 'alphanumeric',
            Cell: v => (typeof v.value == "string") ? (v.value) : ((typeof v.value != "object") ? parseFloat(v.value).toFixed(2) : "")
         })
        })
        setColumns(columns)
      })
      .catch(error => {
        console.log('greska')
        setSensors([]); // reset the [] here - this is optional and is based on expected behaviour
        setDataChart({});
        console.log(error);
      })
      .finally(() => {
        setLoading(false)
        setChartLoading(false)
      })
  }

  useEffect(() => {
    setLoading(true);
    setChartLoading(true)
    fetchData()
  }, []);

  if (sensors.length === 0 && !loading) {
    return <div>No Senors data available</div>;
  }

  return (
    <div>
        <select>
            <option value="⬇️ Select Aggregation Level ⬇️"> -- Aggregation Level -- </option>
            {aggLvl.map((lvl) => <option value={lvl.level} key={lvl.level}>{lvl.level}</option>)}
        </select>
        <select>
            <option value="⬇️ Select a type of Calculation ⬇️"> -- Select type of Calculation -- </option>
            {typeOfCalc.map((type) => <option value={type.type} key={type.type}>{type.type}</option>)}
        </select>
      {loading && <span>Please wait we are fetching table data</span>}
      <SensorTable columns={columns} data={sensors} />
      {Chartloading && <span>Please wait we are fetching chart data</span>}
      <Line data={dataChart}/>

    </div>
  );
}

export default SensorContainer