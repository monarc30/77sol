import React, { Component } from "react";
import axios from "axios";
import MyForm from "./MyForm";
import SimulatorList from "./SimulatorList";
import "./app.css";
class App extends Component {
    state = {
        simulators: [],
        url: 'http://localhost:8001/api/simulators',

    };

    getSimulators = async () => {
        const simulators = await axios.get(this.state.url)         
        this.setState({ simulators: simulators.data })
    };

    componentDidMount(){
        this.getSimulators();
    }

    render() {
        return (
            <div>
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="/#" className="header item">
                            77Sol
                        </a>
                    </div>                
                </div>
                <div className="ui main container">
                    <MyForm />
                    <SimulatorList simulators={this.state.simulators} />
                </div>
            </div>
        );        
    }
}

export default App;



