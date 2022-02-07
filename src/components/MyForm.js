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

    checkCep = event => {
        const cep = event.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json()).then(data => {            
            document.getElementsByName("bairro")[0].value = data.bairro
            document.getElementsByName("cidade")[0].value = data.localidade
        })
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
                        value={this.state.form.cep}
                        onBlur={this.checkCep} />
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

                <hr />

                <h5>* Cidade e Bairro são carregados após inserir o CEP</h5>
                
                <div className="four wide field">                
                    <label>Cidade</label>
                    <input 
                        disabled
                        type="text" 
                        name="cidade" 
                        placeholder="Cidade"
                        onChange={this.handleChange}
                        value={this.state.form.cidade} />
                </div>        


                <div className="four wide field">                
                    <label>Bairro</label>
                    <input 
                        disabled
                        type="text" 
                        name="bairro" 
                        placeholder="Bairro"
                        onChange={this.handleChange}
                        value={this.state.form.bairro} />
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