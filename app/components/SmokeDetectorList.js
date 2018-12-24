import React from 'react';
import io from 'socket.io-client';
import SmokeDetector from './SmokeDetector';

class SmokeDetectorList extends React.Component {

    constructor() {
        super();

        this.state = {
            detectors: {}
        }

        this.testDetector = this.testDetector.bind(this);
        this.resetDetector = this.resetDetector.bind(this);
    }

    componentDidMount() {
        this.socket = io('localhost:3000/smoke');
        this.socket.on('update',(data) => {
            this.setState({
                detectors: data
            })
        })
    }

    componentWillUnmount() {
        this.socket.close();
    }

    testDetector(room) {
        this.socket.emit("set_detector", {room, status: "active"});
    }

    resetDetector(room) {
        this.socket.emit("set_detector", {room, status: "inactive"});
    }

    render() {
        return (
            <div className="smoke-detector-list">
                <h2>Smoke Detectors</h2>
                <div className="detectors">
                    {
                        Object.keys(this.state.detectors).map((room) => {
                            return (
                                <div className="detector">  
                                    <SmokeDetector 
                                    detector={this.state.detectors[room]} 
                                    handleReset={this.resetDetector} 
                                    handleTest={this.testDetector} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

module.exports = SmokeDetectorList