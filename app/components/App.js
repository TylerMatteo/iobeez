import React from 'react';
import Temperature from './Temperature';
import SmokeDetectorList from './SmokeDetectorList';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            words: ['bleep']
        } 
    }

    render() {
        return (
            <div>
                <header>
                    <div className="header-content">
                        <h1>123 A Lane, Pittsburgh PA, 15224</h1>
                        <p>Good morning. Here's how things are going.</p>
                    </div>
                </header>
                <main>
                    <div className="main-content">
                        <div className="panel">
                            <Temperature />
                        </div>
                        <div className="panel">
                            <SmokeDetectorList />
                        </div>
                    </div>

                    
                </main>
            </div>
        )
    }
}

module.exports = App;