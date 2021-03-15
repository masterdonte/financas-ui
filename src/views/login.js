import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import UsuarioService from '../services/usuario-service'
import { AuthContext } from '../services/provider-auth'
import { mensagemErro } from '../componentes/toastr'

class Login extends React.Component{
    state ={
        email: '',
        senha: ''
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {            
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        }).catch(erro => {
            mensagemErro(erro.response.data);
        })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
    }

  render(){
    return(
        <div className="row">
            <div className="col-md-6" style={{position:'relative', left:'300px'}}>
                <div className="bs-docs-section">
                    <Card title="Login">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="inputEmail">
                                            <input type="email" className="form-control" id="inputEmail" placeholder="Digite o Email"
                                            value={this.state.email} onChange={(e) => this.setState({email: e.target.value}) } />
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="inputPassword">
                                            <input type="password" className="form-control" id="inputPassword" placeholder="Senha"
                                            value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value}) } />
                                        </FormGroup>
                                        <button onClick={this.entrar} className="btn btn-success">
                                            <i className="pi pi-sign-in"/>  Entrar
                                        </button>
                                        <button onClick={this.prepareCadastrar} className="btn btn-danger">
                                        <i className="pi pi-plus-circle"/> Cadastrar
                                        </button>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
  }
}

Login.contextType = AuthContext
export default withRouter( Login )
