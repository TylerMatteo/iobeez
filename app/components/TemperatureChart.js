import React from 'react';
import { MinimapXYFrame } from "semiotic";

function TemperatureChart(props) {

    // const settings = {
    //     lines: data,
    //     showLinePoints: true,
    //     lineType: { type: "line" },
    //     xAccessor: "step",
    //     yAccessor: "value",
    //     lineStyle: d => ({ fill: d.label, stroke: d.label, fillOpacity: 0.75 }),
    //     axes: [
    //         { orient: "left"},
    //         {
    //             orient: "bottom",
    //             ticks: 6
    //         }
    //     ]
    // };

    console.log(props);

    return (
        <ul>
        {
            props.data.map((datum) =>
                <li key={datum}>
                        {datum.timestamp},{datum.temperatures.bedroom}
                </li>
            )
        }
    </ul>
    )

    // <MinimapXYFrame
    //     size={[1000, 700]}
    //     {...settings}
    //     xExtent={selectedExtent}
    //     matte={true}
    //     margin={{ left: 50, top: 10, bottom: 50, right: 20 }}
    //     minimap={{
    //         margin: { top: 20, bottom: 35, left: 20, right: 20},
    //         ...settings,
    //         brushEnd: brushFunction,
    //         yBrushable: false,
    //         xBrushExtent: extent,
    //         size: [1000, 150]
    //     }}
    // />
}

module.exports = TemperatureChart;