import React from 'react';
import { MinimapXYFrame } from "semiotic";
import { scaleTime, scaleLinear } from 'd3-scale';
import { timeFormat } from 'd3-time-format';
import { timeSecond } from 'd3-time';
import { curveMonotoneX } from "d3-shape";
import moment from 'moment';

class TemperatureChart extends React.Component {

    constructor(props) {
        super(props)

        this.state= {
            selectedExtent: [props.rooms[0].data[0].timestamp, props.rooms[0].data.slice(-1)[0].timestamp]
        }

        const sharedSettings = {
            
            lineDataAccessor: "data",
            showLinePoints: true,
            lineIDAccessor: "id",
            lineType: { type: "line", interpolator: curveMonotoneX },
            xAccessor: "timestamp",
            yAccessor: "temperature",
            xScaleType: scaleTime(),
            yScaleType: scaleLinear(),
            lineStyle: d => ({ stroke: d.color }),
            pointStyle: d => ({fill: d.color, stroke: d.color})
        }

        this.minimap= {
            yBrushable: false,
            size: [1200, 150],
            margin: { left: 75, top: 10, bottom: 50, right: 40 },
            ...sharedSettings
        }

        this.minimapXYFrameSettings = {
            size: [1200, 400],
            matte: true,
            legend: true,
            margin: { left: 75, top: 10, bottom: 50, right: 140 },
            axes: [
                { 
                    orient: "left",
                    ticksValues: [68,68.5,69,69.5,70,70.5,71,71.5,72],
                    label: "Degrees",
                    className: "axis-tick"
                },
                {
                    orient: "bottom",
                    ticks: timeSecond.every(5),
                    tickFormat: (d) => { return timeFormat("%I:%M:%S %p")(d); },
                    label: "Time",
                    className: "axis-tick"
                }
            ],
            ...sharedSettings
        }

        this.changeExtent = this.changeExtent.bind(this);
        
    }

    changeExtent(newVal) {
        if(this.state.selectedExtent[0] !== moment(newVal[0]).valueOf() || this.state.selectedExtent[1] !== moment(newVal[1]).valueOf()){
            this.setState({
                selectedExtent: [
                    moment(newVal[0]).valueOf(),
                    moment(newVal[1]).valueOf()
                ]
            })
        }
    }

    render() {

        return (
            <div>
                <MinimapXYFrame
                    lines={this.props.rooms}
                    xExtent={this.state.selectedExtent}
                    {...this.minimapXYFrameSettings}
                    minimap={{
                        lines: this.props.rooms,
                        brushEnd: this.changeExtent,
                        xBrushExtent: this.state.selectedExtent,
                        ...this.minimap
                    }}
                />
            </div>
            
        )
    }
    

    
}

module.exports = TemperatureChart;