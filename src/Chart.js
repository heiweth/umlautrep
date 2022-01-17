import React, { useState, useEffect } from 'react';

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

export default function ChartTest() {
  const [dataChart, setDataChart] = useState({
    label: [],
    data: []
  });
  const [Chartloading, setChartLoading] = useState(false);

  useEffect(() => {
        setChartLoading(true);
        const fetchData = async () => {
        const response = await fetch("https://xs4p80dihg.execute-api.eu-west-1.amazonaws.com/dev/hello")
        const data = await response.json()
        const requiredDataFromResponse = data.body;
        const dates: any[] = [];
        const erab: any[] = [];
        requiredDataFromResponse.forEach(eachSensorItem => {
            dates.push(eachSensorItem.date)
            erab.push(parseFloat(eachSensorItem["VoLTE E-RAB (QCI1) Success Rate (Voice) (%)"]).toFixed(2))
        })
        console.log(dates)
        console.log(erab)

        setDataChart({
            label: dates,
            data: erab,
        });
        setChartLoading(true)
        }
       fetchData();
      }, [])

  console.log(Chartloading, dataChart)

    const data = {
    labels: dataChart.label,
    datasets: [
      {
        label: 'VoLTE E-RAB (QCI1) Success Rate (Voice) (%)',
        data: dataChart.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
      return(
        <div style={{ height:'500px',width:'1000px',margin:'0 auto' }}>
           <Line data={data} />
        </div>
      )
    }