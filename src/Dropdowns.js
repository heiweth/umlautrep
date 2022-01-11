import React, { useState, useEffect } from 'react';
import { useTable, useFilters, useSortBy} from 'react-table'

function Dropdowns() {
  const [loading, setLoading] = useState(false);
  const [typeOfCalc, setType] = useState([]);
  const [aggLvl, setAggLvl] = useState([]);

  const fetchData = () => {
    fetch("https://xs4p80dihg.execute-api.eu-west-1.amazonaws.com/dev/hello")
      .then(response => {
        return response.json()
      })
      .then(data => {
        const requiredDataFromResponse = data.body;
        let optionType = requiredDataFromResponse.map((eachSensorItem) => {
            return eachSensorItem.type_of_calculation
        })
        let types = []
        let test = new Set(optionType)
        test.forEach(t => {
            types.push({
                type: t
            })
        })
        setType(types)
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
        setSensors([]); // reset the [] here - this is optional and is based on expected behaviour
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(true);
    fetchData()
  }, []);

  if (sensors.length === 0 && !loading) {
    return <div>No Senors data available</div>;
  }

  return (
    <div>
        <select>
            <option value="⬇️ Select a fruit ⬇️"> -- Select a fruit -- </option>
            {typeOfCalc.map((type) => <option value={type.type} key={type.type}>{type.type}</option>)}
        </select>
      {loading && <span>Please wait we are fetching data</span>}
      <SensorTable columns={columns} data={sensors} />
    </div>
  );
}

export default SensorContainer