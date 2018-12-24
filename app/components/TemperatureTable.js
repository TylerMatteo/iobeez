import React from 'react';
import moment from 'moment';

function TemperatureTable(props) {
    
    return (
        <div className="temperature-table">
            <h3>All Readings</h3>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            {
                                Object.keys(props.data[0].temperatures).map((room) => <th>{room}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.data.map((reading) => {
                                return (
                                    <tr>
                                        <td>{moment(reading.timestamp).format("h:mm:ss a")}</td>
                                        {
                                            Object.keys(reading.temperatures).map((room) => {
                                                return (
                                                        <td>{reading.temperatures[room]}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}

module.exports = TemperatureTable;