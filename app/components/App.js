import React from 'react';
import io from 'socket.io-client';
import Temperature from './Temperature'

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            words: ['bleep']
        }
    }

    // componentDidMount() {
    //     this.socket = io('localhost:3000/temperature');
    //     this.socket.on('update',(data) => {
    //         console.log(data);
    //         this.setState((prevState) => {
    //             return {
    //                 words: [...prevState.words, data]
    //             }
    //         })
    //     })
    // }

    // componentWillUnmount() {
    //     this.socket.close();
    // }

    render() {
        return (
            <main>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <Temperature />
                </div>
                <div>

                </div>


                {/* <ul>
                    {
                        this.state.words.map((word) =>
                            <li key={word}>
                                    {word}
                            </li>
                        )
                    }
                </ul> */}

                
            </main>
        )
    }
}

module.exports = App;