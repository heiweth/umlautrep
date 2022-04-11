import React, { Component } from 'react';

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

class KPI extends Component {
    constructor(props) {
        super(props);
        this.state={
            dataChartVoice:{label: [], data: [], },
            dataChartLte:{label: [], data: [], },
            dataChartSRVCC:{label: [], data: [], },
            dataChartDrop:{label: [], data: [], },
            dataChartSucc23:{label: [], data: [], },
            dataChartSucc34:{label: [], data: [], },
            dataChartDrop23:{label: [], data: [], },
            dataChartDrop34:{label: [], data: [], },
            dataChartThroup45:{label: [], data: [], },
            dataChartThroup1:{label: [], data: [], },
            dataChartLteavg:{label: [], data: [], },
            dataChartSuccall:{label: [], data: [], },
        }
    }

    componentDidMount() {
        this.getchartData();
    }

    getchartData = () => {
        // Make request to the node backend. You might need to enable CORS in the express app.
        fetch("https://xs4p80dihg.execute-api.eu-west-1.amazonaws.com/dev/hello")
        .then(res => res.json())
        .then((data) => {
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

            this.setState({
                dataChartVoice:{
                    label: dates,
                    data: voice,
                },
                dataChartLte:{
                    label: dates,
                    data: lte,
                },
                dataChartSRVCC:{
                    label: dates,
                    data: srvcc,
                },
                dataChartDrop:{
                    label: dates,
                    data: drop,
                },
                dataChartSucc34:{
                    label: dates,
                    data: succ34,
                },
                dataChartSucc23:{
                    label: dates,
                    data: succ23,
                },
                dataChartDrop23:{
                    label: dates,
                    data: drop23,
                },
                dataChartDrop34:{
                    label: dates,
                    data: drop34,
                },
                dataChartThroup45:{
                    label: dates,
                    data: throup45,
                },
                dataChartThroup1:{
                    label: dates,
                    data: throup1,
                },
                dataChartLteavg:{
                    label: dates,
                    data: lteavg,
                },
                dataChartSuccall:{
                    label: dates,
                    data: succall,
                },

            })

            .catch((error) => {
              console.error('Error:', error);
            });
    });
    }


    render() {
                const dataVoice = {
    labels: this.state.dataChartVoice.label,
    datasets: [
      {
        label: 'VoLTE E-RAB (QCI1) Success Rate (Voice) (%)',
        data: this.state.dataChartVoice.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataLte = {
    labels: this.state.dataChartLte.label,
    datasets: [
      {
        label: "VOLTE Handover Success Rate (Intra-LTE)",
        data: this.state.dataChartLte.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataSRVCC = {
    labels: this.state.dataChartSRVCC.label,
    datasets: [
      {
        label: "VOLTE SRVCC Handover Success Rate",
        data: this.state.dataChartSRVCC.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataDrop = {
    labels: this.state.dataChartDrop.label,
    datasets: [
      {
        label: "VoLTE Call Drop Rate",
        data: this.state.dataChartDrop.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataSucc34 = {
    labels: this.state.dataChartSucc34.label,
    datasets: [
      {
        label: "Data Service Setup Success Rate (3G/4G)",
        data: this.state.dataChartSucc34.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataSucc23 = {
    labels: this.state.dataChartSucc23.label,
    datasets: [
      {
        label: "Voice Call Setup Success Rate (2G/3G)",
        data: this.state.dataChartSucc23.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataDrop23 = {
    labels: this.state.dataChartDrop23.label,
    datasets: [
      {
        label: "Voice Call Drop Rate (2G/3G)",
        data: this.state.dataChartDrop23.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataDrop34 = {
    labels: this.state.dataChartDrop34.label,
    datasets: [
      {
        label: "Data Service Drop Rate (3G/4G)",
        data: this.state.dataChartDrop34.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataThroup45 = {
    labels: this.state.dataChartThroup45.label,
    datasets: [
      {
        label: "% cells < 4.5 Mbps DL user Throughput (4G)",
        data: this.state.dataChartThroup45.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataThroup1 = {
    labels: this.state.dataChartThroup1.label,
    datasets: [
      {
        label: "% cells < 1 Mbps UL user Throughput (4G)",
        data: this.state.dataChartThroup1.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataLteavg = {
    labels: this.state.dataChartLteavg.label,
    datasets: [
      {
        label: "LTE Radio Quality Average CQI (%Cells > CQI8)",
        data: this.state.dataChartLteavg.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };
    const dataSuccall = {
    labels: this.state.dataChartSuccall.label,
    datasets: [
      {
        label: "Handover Success Rate (All Tech)",
        data: this.state.dataChartSuccall.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      }
    ],
  };


        return ([
            <div style= {{ height:'200px', width:'80%', margin:'0 auto' }} >
            <Line data={dataVoice} />
            </div>,
            <div style= {{ height:'200px', width:'80%', margin:'0 auto' }} >
            <Line data={dataDrop} />
            </div>,
        ])
    }

}

export default KPI;
