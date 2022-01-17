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
            chartData:{
                labels: [],
                datasets: [{
                    label: "Jos jedan test",
                    data: [],
            }]
        }}
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
            let dates = []
            let erab = []
            requiredDataFromResponse.forEach(eachSensorItem => {
                dates.push(eachSensorItem.date)
                erab.push(parseFloat(eachSensorItem["VoLTE E-RAB (QCI1) Success Rate (Voice) (%)"]).toFixed(2))
            })

            this.setState({
                chartData:{
                    labels: dates,
                    datasets: [{
                        label: "Jos jedan test",
                        data: erab,
            }]
        }})

            .catch((error) => {
              console.error('Error:', error);
            });
    });
    }

    render() {
        return (
            <p> {this.state.chartData.datasets[0].label} </p>
        )
    }

}

export default KPI;
