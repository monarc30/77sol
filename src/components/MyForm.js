import React, { Component } from  "react";

class MyForm extends Component {
    render() {
        return (            
            <form className="ui form">                    

                <h2>Simulador</h2>                

                <div className="four wide field">                                    
                    <label>CEP</label>
                    <input type="text" name="cep" placeholder="Cep" />
                </div>
                <div className="four wide field">                
                    <label>Valor da conta</label>
                    <input type="text" name="valor_conta" placeholder="Valor da conta" />
                </div>
                <div className="four wide field">                
                    <label>Tipo de telhado</label>
                    <input type="text" name="tipo_telhado" placeholder="Tipo de telhado" />                    
                </div>                                
                
                <button className="ui primary button">Save</button>                                
                
            </form>
        )        
    }
}

export default MyForm