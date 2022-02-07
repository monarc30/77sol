import React, { Component } from "react";
import Simulator from "./Simulator";

class SimulatorList extends Component {
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
                        </tr>
                    </thead>

                    <tbody>
                        {
                            simulators.map((simulator) => {
                                return(
                                    <Simulator simulator={ simulator } key={ simulator.id  } />
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
