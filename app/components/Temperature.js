import React from 'react';
import TemperatureChart from './TemperatureChart';
import TemperatureAverages from './TemperatureAverages';
import TemperatureTable from './TemperatureTable';
import io from 'socket.io-client';
import moment from 'moment';

class Temperature extends React.Component {

    constructor() {
        super()

        // Seed the array of data with some inital values so things make sense when the page first loads.
        // Realistically values from before the socket was opened would be available
        let initialData = []
        const now = moment();
        now.subtract(3, "seconds").valueOf()
        for(let i = 5; i > 0; i--) {
            initialData.push({
                timestamp: now.subtract(i*3, "seconds").valueOf(),
                temperatures: {
                    bedroom: 68+parseFloat((Math.random()*4).toFixed(2)),
                    living: 68+parseFloat((Math.random()*4).toFixed(2)),
                    kitchen: 68+parseFloat((Math.random()*4).toFixed(2)),
                    basement: 68+parseFloat((Math.random()*4).toFixed(2)),
                }
            })
        }

        this.state = {
            data: initialData,
        };

        this.convertToChartData = this.convertToChartData.bind(this);
    }

    // Converts temp data from the shape the API gives us to the shape our chart component expects
    convertToChartData(temps) {

        // Initialize chartData. Making an assumption on which rooms coming back from API, ideally this list would be stored elsewhere
        const chartData = [
            {
                id: "bedroom",
                color: "#4d430c",
            },
            {
                id: "living",
                color: "#b3331d",
            },
            {
                id: "kitchen",
                color: "#d38779",
            },
            {
                id: "basement",
                color: "#007190",
            },
        ];

        // Iterate over rooms to populate data
        chartData.forEach((room) => {
            room.data = temps.map((reading) => {
                return {
                    temperature: reading.temperatures[room.id],
                    timestamp: reading.timestamp
                }
            }).sort((a,b) => { return a.timestamp > b.timestamp ? 1 : -1 })
        })

        return chartData;
    }

    componentDidMount() {
        this.socket = io('localhost:3000/temperature');
        this.socket.on('update',(data) => {
            this.setState((prevState) => {
                return {
                    data: [...prevState.data, data]
                }
            })
        })
    }

    componentWillUnmount() {
        this.socket.close();
    }

    render() {
        return (
            <div className="temperature">
                <h2>Temperature</h2>
                <TemperatureChart rooms={this.convertToChartData(this.state.data)} />
                <div className="temperature-details">
                    <div className="temperature-detail">
                        <TemperatureAverages data={this.state.data} />
                    </div>
                    <div className="temperature-detail">
                        <TemperatureTable data={this.state.data} />
                    </div>
                </div>
                
                
            </div>
        ) 
    }
}

module.exports = Temperature;