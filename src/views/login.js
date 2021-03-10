import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import UsuarioService from '../services/usuario-service'
import storage from '../services/storage-service'
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
            storage.adicionarItem('_usuario_logado', response.data)
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
                                        <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                        <button onClick={this.prepareCadastrar} className="btn btn-danger">Cadastrar</button>
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

export default withRouter( Login )
