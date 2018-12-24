import React from 'react';

function SmokeDetector(props) {
    return (
        <div>
            <span className="room">{props.detector.id}</span>
            <br/>
            {
              props.detector.status === "active"
              ?
                <div>
                    <span className="active">
                        Fire Detected
                    </span>
                    <br/>
                    <button onClick={() => props.handleReset(props.detector.id)}>
                        Reset
                    </button>
                </div>
              :
                <div>
                    <span className="inactive">
                        All Clear
                    </span>
                    <br/>
                    <button onClick={() => props.handleTest(props.detector.id)}>
                        Test
                    </button>
                </div>
                  
            }
        </div>
    )
}

module.exports = SmokeDetector;