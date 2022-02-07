import React, { Component } from "react";

class Simulator extends Component {
    render() {
        const { id, cep, valor, tipo_telhado } = this.props.simulator;
        return (
            <tr>
                <td style={{ textAlign: "center" }}>{id}</td>
                <td>{cep}</td>
                <td>{valor}</td>
                <td>{tipo_telhado}</td>
                <td>
                    <button className="mini ui blue button">Edit</button>
                    <button className="mini ui red button">Delete</button>
                </td>
            </tr>

        );        
    }
}

export default Simulator;