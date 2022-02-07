import React, { Component } from  "react";

class MyForm extends Component {
    state = {
        form: { cep: '', valor: '', tipo_telhado: '', isEdit: false },
        btnName: 'Save',
        btnClass: 'ui primary button'
    };

    isEmpty(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidUpdate(prevProps) {        
        if (prevProps !== this.props && !this.isEmpty(this.props.simulator)) {
            this.setState({
                form: { ...this.props.simulator, isEdit: true},
                btnName: "Update",
                btnClass: "ui orange button"
            });
        }
        
    };

    handleChange = event => {
        const { name, value } = event.target;
        let form = this.state.form;
        form[name] = value;
        this.setState({ form });
    };

    onFormSubmit = (event) => {
        event.preventDefault();        

        if (this.formValidation()) {
            this.props.onFormSubmit(this.state.form);
        }

        this.clearFormFields();
    };

    clearFormFields = () => {
        this.setState({
            form: { cep: '', valor: '', tipo_telhado: '', isEdit: false },
        });

        this.setState({
            btnName: "Save",
            btnClass: "ui orange button"
        })

        document.querySelector(".form").reset();
    };    

    formValidation = () => {
        if (document.getElementsByName("cep")[0].value === '') {
            alert("Digite o cep");
            return false;
        }

        if (document.getElementsByName("valor")[0].value === '') {
            alert("Digite o valor");
            return false;
        }

        if (document.getElementsByName("tipo_telhado")[0].value === '') {
            alert("Digite o tipo do telhado");
            return false;
        }
        return true;
    };
    
    render() {
        return (            
            <form className="ui form">                    

                <h2>Simulador</h2>                

                <div className="four wide field">                                    
                    <label>CEP</label>
                    <input 
                        type="text" 
                        name="cep" 
                        placeholder="Cep" 
                        onChange={this.handleChange}
                        value={this.state.form.cep} />
                </div>
                <div className="four wide field">                
                    <label>Valor da conta</label>
                    <input 
                        type="text" 
                        name="valor" 
                        placeholder="Valor da conta"
                        onChange={this.handleChange} 
                        value={this.state.form.valor} />
                </div>
                <div className="four wide field">                
                    <label>Tipo de telhado</label>
                    <input 
                        type="text" 
                        name="tipo_telhado" 
                        placeholder="Tipo de telhado" 
                        onChange={this.handleChange}
                        value={this.state.form.tipo_telhado} />                    
                </div>                                
                
                <button 
                    className={this.state.btnClass} onClick={this.onFormSubmit}>
                        {this.state.btnName}
                </button>                                
                
            </form>
        )        
    }
}

export default MyForm