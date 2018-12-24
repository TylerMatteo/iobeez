import React from 'react';
import moment from 'moment';

function TemperatureAverages(props) {

    const now = moment();
    const rooms = Object.keys(props.data[0].temperatures);


    const lastMinute = props.data.filter((reading) => {
        return moment(reading.timestamp).isBetween(now.clone().subtract(1, "minutes"),now)
    });

    const lastTenMinutes = props.data.filter((reading) => {
        return moment(reading.timestamp).isBetween(now.clone().subtract(10, "minutes"),now)
    });

    let minuteAverages = {};
    let tenMinuteAverages = {};
    
    // rooms.forEach(room => minuteAverages[room] = 0)

    rooms.forEach((room) => {
        minuteAverages[room] = lastMinute.reduce((acc, reading) => { return acc + reading.temperatures[room]}, 0)/lastMinute.length;
        tenMinuteAverages[room] = lastTenMinutes.reduce((acc, reading) => { return acc + reading.temperatures[room]}, 0)/lastTenMinutes.length;
    })

    function trim(num) {
        return parseFloat(num.toFixed(2))
    }

    Object.values(minuteAverages)


    return (
        <div className="temperature-averages">
            <h3>Averages</h3>
            <h4>Last Minute</h4>
            <table>
                <tbody>
                    {
                        Object.keys(minuteAverages).map((key) => {
                            return (
                                <tr>
                                    <td>{key}</td>
                                    <td>{trim(minuteAverages[key])}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <h4>Last Ten Minutes</h4>
            <table>
                <tbody>
                    {
                        Object.keys(tenMinuteAverages).map((key) => {
                            return (
                                <tr>
                                    <td>{key}</td>
                                    <td>{trim(tenMinuteAverages[key])}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}

module.exports = TemperatureAverages;