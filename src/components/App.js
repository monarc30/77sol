import React, { Component } from "react";
import MyForm from "./MyForm";
import "./app.css";
import SimulatorList from "./SimulatorList";

class App extends Component {
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
                    <SimulatorList />
                </div>
            </div>
        );        
    }
}

export default App;



