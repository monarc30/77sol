import React, { Component } from "react";
import axios from "axios";
import MyForm from "./MyForm";
import SimulatorList from "./SimulatorList";
import "./app.css";
class App extends Component {
    state = {
        simulators: [],
        simulator: {},        
        url: 'http://localhost:8001/api/simulators',

    };

    getSimulators = async () => {
        const simulators = await axios.get(this.state.url)         
        this.setState({ simulators: simulators.data })
    };

    deleteSimulator = async id => {                
        await axios.delete(`${this.state.url}/${id}`);        
        this.getSimulators();
    };

    createSimulator = async (data) => {
        await axios.post(this.state.url,{
            cep: data.cep,
            valor: data.valor,
            tipo_telhado: data.tipo_telhado
        });        

        this.getSimulators();
    }

    editSimulator = async (data) => {
        this.setState({ customer: {} });
        await axios.put(`${this.state.url}/${data.id}`, { 
            cep: data.cep,
            valor: data.valor,
            tipo_telhado: data.tipo_telhado
        });        

        this.getSimulators();
    }

    componentDidMount(){
        this.getSimulators();
    }

    onDelete = id => {
        this.deleteSimulator(id);
    };

    onEdit = data => {
        //this.EditSimulator(id);
        console.log('edit ',data);
        this.setState({ simulator: data })
    };

    onFormSubmit = (data) => {
        if (data.isEdit) {
            this.editSimulator(data);

        }else{
            this.createSimulator(data);
        }
    };

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
                    <MyForm 
                        simulator={this.state.simulator} 
                        onFormSubmit={this.onFormSubmit} 
                    />
                    <SimulatorList 
                        simulators={this.state.simulators} 
                        onDelete={this.onDelete}
                        onEdit={this.onEdit}
                    />
                </div>
            </div>
        );        
    }
}

export default App;



