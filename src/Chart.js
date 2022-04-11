import React, { useState, useEffect, Component } from 'react';

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
  const [dataChartVoice, setDataVoice] = useState({label: [], data: []});
  const [dataChartLte, setDataLte] = useState({label: [], data: []});
  const [dataChartSRVCC, setDataSRVCC] = useState({label: [], data: []});
  const [dataChartDrop, setDataDrop] = useState({label: [], data: []});
  const [dataChartSucc23, setDataSucc23] = useState({label: [], data: []});
  const [dataChartSucc34, setDataSucc34] = useState({label: [], data: []});
  const [dataChartDrop23, setDataDrop23] = useState({label: [], data: []});
  const [dataChartDrop34, setDataDrop34] = useState({label: [], data: []});
  const [dataChartThroup45, setDataThroup45] = useState({label: [], data: []});
  const [dataChartThroup1, setDataThroup1] = useState({label: [], data: []});
  const [dataChartLteavg, setDataLteavg] = useState({label: [], data: []});
  const [dataChartSuccall, setDataSuccall] = useState({label: [], data: []});
  const [Chartloading, setChartLoading] = useState(false);

  useEffect(() => {
        setChartLoading(true);
        const fetchData = async () => {
        const response = await fetch("https://xs4p80dihg.execute-api.eu-west-1.amazonaws.com/dev/hello")
        const data = await response.json()
        const requiredDataFromResponse = data.body;
        const dates: any[] = [];
        const voice: any[] = [];
        const lte: any[] = [];
        const srvcc: any[] = [];
        const drop: any[] = [];
        const drop23: any[] = [];
        const drop34: any[] = [];
        const succ23: any[] = [];
        const succ34: any[] = [];
        const succall: any[] = [];
        const throup1: any[] = [];
        const throup45: any[] = [];
        const lteavg: any[] = [];
        requiredDataFromResponse.forEach(eachSensorItem => {
            dates.push(eachSensorItem.date)
            voice.push(parseFloat(eachSensorItem["VoLTE E-RAB (QCI1) Success Rate (Voice) (%)"]).toFixed(2))
            lte.push(parseFloat(eachSensorItem["VOLTE Handover Success Rate (Intra-LTE)"]).toFixed(2))
            srvcc.push(parseFloat(eachSensorItem["VOLTE SRVCC Handover Success Rate"]).toFixed(2))
            drop.push(parseFloat(eachSensorItem["VoLTE Call Drop Rate"]).toFixed(2))
            succ34.push(parseFloat(eachSensorItem["Data Service Setup Success Rate (3G/4G)"]).toFixed(2))
            succ23.push(parseFloat(eachSensorItem["Voice Call Setup Success Rate (2G/3G)"]).toFixed(2))
            drop23.push(parseFloat(eachSensorItem["Voice Call Drop Rate (2G/3G)"]).toFixed(2))
            drop34.push(parseFloat(eachSensorItem["Data Service Drop Rate (3G/4G)"]).toFixed(2))
            throup45.push(parseFloat(eachSensorItem["% cells < 4.5 Mbps DL user Throughput (4G)"]).toFixed(2))
            throup1.push(parseFloat(eachSensorItem["% cells < 1 Mbps UL user Throughput (4G)"]).toFixed(2))
            lteavg.push(parseFloat(eachSensorItem["LTE Radio Quality Average CQI (%Cells > CQI8)"]).toFixed(2))
            succall.push(parseFloat(eachSensorItem["Handover Success Rate (All Tech)"]).toFixed(2))
        })
        console.log(dates)
        console.log(voice)

        setDataVoice({
            label: dates,
            data: voice,
        });
        setDataLte({
            label: dates,
            data: lte,
        });
        setDataSRVCC({
            label: dates,
            data: srvcc,
        });
        setDataDrop({
            label: dates,
            data: drop,
        });
        setDataSucc34({
            label: dates,
            data: succ34,
        });
        setDataSucc23({
            label: dates,
            data: succ23,
        });
        setDataDrop23({
            label: dates,
            data: drop23,
        });
        setDataDrop34({
            label: dates,
            data: drop34,
        });
        setDataThroup45({
            label: dates,
            data: throup45,
        });
        setDataThroup1({
            label: dates,
            data: throup1,
        });
        setDataLteavg({
            label: dates,
            data: lteavg,
        });
        setDataSuccall({
            label: dates,
            data: succall,
        });
        setChartLoading(true)
        }
       fetchData();
      }, [])

    const dataVoice = {
    labels: dataChartVoice.label,
    datasets: [
      {
        label: 'VoLTE E-RAB (QCI1) Success Rate (Voice) (%)',
        data: dataChartVoice.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataLte = {
    labels: dataChartLte.label,
    datasets: [
      {
        label: "VOLTE Handover Success Rate (Intra-LTE)",
        data: dataChartLte.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataSRVCC = {
    labels: dataChartSRVCC.label,
    datasets: [
      {
        label: "VOLTE SRVCC Handover Success Rate",
        data: dataChartSRVCC.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataDrop = {
    labels: dataChartDrop.label,
    datasets: [
      {
        label: "VoLTE Call Drop Rate",
        data: dataChartDrop.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataSucc34 = {
    labels: dataChartSucc34.label,
    datasets: [
      {
        label: "Data Service Setup Success Rate (3G/4G)",
        data: dataChartSucc34.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataSucc23 = {
    labels: dataChartSucc23.label,
    datasets: [
      {
        label: "Voice Call Setup Success Rate (2G/3G)",
        data: dataChartSucc23.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataDrop23 = {
    labels: dataChartDrop23.label,
    datasets: [
      {
        label: "Voice Call Drop Rate (2G/3G)",
        data: dataChartDrop23.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataDrop34 = {
    labels: dataChartDrop34.label,
    datasets: [
      {
        label: "Data Service Drop Rate (3G/4G)",
        data: dataChartDrop34.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataThroup45 = {
    labels: dataChartThroup45.label,
    datasets: [
      {
        label: "% cells < 4.5 Mbps DL user Throughput (4G)",
        data: dataChartThroup45.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataThroup1 = {
    labels: dataChartThroup1.label,
    datasets: [
      {
        label: "% cells < 1 Mbps UL user Throughput (4G)",
        data: dataChartThroup1.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataLteavg = {
    labels: dataChartLteavg.label,
    datasets: [
      {
        label: "LTE Radio Quality Average CQI (%Cells > CQI8)",
        data: dataChartLteavg.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataSuccall = {
    labels: dataChartSuccall.label,
    datasets: [
      {
        label: "Handover Success Rate (All Tech)",
        data: dataChartSuccall.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };

      return (
        <div style= {{ height:'200px', width:'80%', margin:'0 auto' }} >
            <Line data={dataVoice} />
            <Line data={dataLte} />
            <Line data={dataSRVCC} />
            <Line data={dataDrop} />
            <Line data={dataSucc34} />
            <Line data={dataSucc23} />
            <Line data={dataDrop23} />
            <Line data={dataDrop34} />
            <Line data={dataThroup45} />
            <Line data={dataThroup1} />
            <Line data={dataLteavg} />
            <Line data={dataSuccall} />
        </div>
      );
    }
