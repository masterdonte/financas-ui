import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../componentes/card'
import FormGroup from '../../componentes/form-group'
import SelectMenu from '../../componentes/select-menu'
import LancamentoService from '../../services/lancamento-service'
import storage from '../../services/storage-service'
import * as messages from '../../componentes/toastr'

class CadastroLancamentos extends React.Component{

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo:'',
        status: ''
    }

    componentDidMount(){
        const params = this.props.match.params
        console.log(params)
    }

    submit = () => {
        const logado = storage.obterItem('_usuario_logado')
        const {descricao, valor, mes, ano, tipo } = this.state
        const lancamento = {descricao, valor, mes, ano, tipo, usuario: logado.id }

        this.service.salvar(lancamento)
            .then(() =>{
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Usuário cadastrado com sucesso')
            }).catch(error =>{
                messages.mensagemErro(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value
        const name  = event.target.name
        this.setState({ [name]: value})
    }

    render(){
        const meses = this.service.obterListaMeses()
        const tipos = this.service.obterListaTipos()

        return(
            <Card title="Cadastro Lançamento">
                <div className="row">
                    <div className="col-lg-12">
                        <FormGroup label="Descrição: *" htmlFor="inputDescricao">
                            <input id="inputDescricao" type="text" className="form-control" placeholder="Digite a descrição"
                                 name="descricao" value={this.state.descricao} onChange={this.handleChange}/>
                        </FormGroup> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <FormGroup label="Ano: *" htmlFor="inputAno">
                            <input id="inputAno" type="text" className="form-control" name="ano"
                                placeholder="Digite o ano" value={this.state.ano} onChange={this.handleChange}/>
                        </FormGroup> 
                    </div>
                    <div className="col-lg-6">
                        <FormGroup label="Mês: *" htmlFor="inputMes">
                            <SelectMenu id="inputMes" name="mes" className="form-control" 
                                    lista={meses} value={this.state.mes} onChange={this.handleChange}/>
                        </FormGroup> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <FormGroup label="Valor: *" htmlFor="inputValor">
                            <input id="inputValor" name="valor" type="text" className="form-control" placeholder="Digite o Valor" 
                                value={this.state.valor} onChange={this.handleChange}/>
                        </FormGroup> 
                    </div>
                    <div className="col-lg-4">
                        <FormGroup label="Tipo: *" htmlFor="inputTipo">
                            <SelectMenu id="inputTipo" name="tipo" className="form-control" lista={tipos}
                                value={this.state.tipo} onChange={this.handleChange}/>
                        </FormGroup> 
                    </div>
                    <div className="col-lg-4">
                        <FormGroup label="Status: *" htmlFor="inputTipo">
                            <input type="text" id="inputStatus" name="status" className="form-control" value={this.state.status} disabled/>
                        </FormGroup> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <button onClick={this.submit} type="button" className="btn btn-success">Salvar</button>
                        <button onClick={e => this.props.history.push('/consulta-lancamentos')} 
                            type="button" className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(CadastroLancamentos)