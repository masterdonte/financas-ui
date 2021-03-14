import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import UsuarioService from '../services/usuario-service'
import { mensagemErro, mensagemSucesso } from '../componentes/toastr'

class CadastroUsuario extends React.Component{

    state ={
        nome: '',
        email:'',
        senha:'',
        senhaRepeticao:''
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }

    cadastrar = () => {
        //const {nome, email, senha, senhaRepeticao } = this.state   //const usuario = {nome, email, senha, senhaRepeticao }
        const usuario = this.state

        try{
            this.service.validar(usuario)
        }catch(err){
            err.mensagens.forEach(msg => mensagemErro(msg))
            return false
        }

        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso. Faça login para acessar')
                this.props.history.push('/login')
            }).catch(erro => {
                mensagemErro(erro.response.data)
            })

        console.log(this.state)
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render(){
        return(
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" id="inputNome" name="nome" className="form-control" 
                                    onChange={e => this.setState({nome:e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="text" id="inputEmail" name="email" className="form-control"
                                    onChange={e => this.setState({email:e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" id="inputSenha" name="senha" className="form-control"
                                    onChange={e => this.setState({senha:e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password" id="inputRepitaSenha" name="senhaRepeticao" className="form-control"
                                    onChange={e => this.setState({senhaRepeticao:e.target.value})}/>
                            </FormGroup>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">
                                <i className="pi pi-save"/> Salvar
                            </button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">
                                <i className="pi pi-times-circle"/> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter( CadastroUsuario )