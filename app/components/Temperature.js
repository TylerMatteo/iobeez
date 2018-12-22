import React from 'react';
import TemperatureChart from './TemperatureChart';
import io from 'socket.io-client';

class Temperature extends React.Component {

    constructor() {
        super()

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.socket = io('localhost:3000/temperature');
        this.socket.on('update',(data) => {
            console.log({data})
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
                <TemperatureChart data={this.state.data} />
            </div>
        ) 
    }
}

module.exports = Temperature;