import React, { Component } from "react";
import Simulator from "./Simulator";

class SimulatorList extends Component {
    onDelete = id => {
        this.props.onDelete(id);
        //console.log("list", id);
    };
    onEdit = data => {
        this.props.onEdit(data);        
        //console.log("list", data);
    };
    render() {
        const simulators = this.props.simulators
        return (            
            <div className="data">
                <br />
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Cep</th>
                            <th>Valor da conta</th>
                            <th>Tipo de telhado</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            simulators.map((simulator) => {
                                return(
                                    <Simulator 
                                        simulator={ simulator } 
                                        key={ simulator.id  } 
                                        onDelete={this.onDelete}
                                        onEdit={this.onEdit}
                                    />
                                )
                            })
                        }                        
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SimulatorList
