import React, { Component } from "react";

class Simulator extends Component {
    onDelete = () => {
        this.props.onDelete(this.props.simulator.id);
    };

    onEdit = () => {
        //console.log("edit");
        this.props.onEdit(this.props.simulator);
    };

    render() {
        const { id, cep, valor, tipo_telhado } = this.props.simulator;
        return (
            <tr>
                <td style={{ textAlign: "center" }}>{id}</td>
                <td>{cep}</td>
                <td>{valor}</td>
                <td>{tipo_telhado}</td>
                <td>
                    <button className="mini ui blue button" onClick={this.onEdit}>Edit</button>
                    <button className="mini ui red button" onClick={this.onDelete}>Delete</button>
                </td>
            </tr>

        );        
    }
}

export default Simulator;