import React, { Component } from "react";
import Simulator from "./Simulator";

class SimulatorList extends Component {
    render() {
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
                        <Simulator />
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SimulatorList
