import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../componentes/card'
import FormGroup from '../../componentes/form-group'
import SelectMenu from '../../componentes/select-menu'
import LancamentosTable from './lancamentos-table'
import LancamentoService from '../../services/lancamento-service'
import storage from '../../services/storage-service'
import * as messages from '../../componentes/toastr'
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method | ConfirmDialog To use <ConfirmDialog> tag

class ConsultaLancamentos extends React.Component{

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    state = {
        ano: '',
        mes: '',
        tipo:'',
        descricao: '',
        selected: {},
        lancamentos: []
    }

    confirmarDelecao = (lanc) => {
        this.setState({selected:lanc})
        confirmDialog({
            message: 'Tem certeza que deseja exluir este registro?',
            header: 'Confirmação de exclusão',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => this.deletar(),
            reject: () => this.cancelar()
        });
    };

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    cancelar = () => {
        this.setState({selected:{}})
    }

    deletar = () => {
        const lanc = this.state.selected;
        this.service
            .deletar(lanc.id)
            .then(response =>{
                const lancamentos = this.state.lancamentos
                const index = lancamentos.indexOf(lanc);
                lancamentos.splice(index, 1)// apagando 1 elemento a partir daquele índice
                this.setState(lancamentos); // this.setState({lancamentos:lancamentos});
                messages.mensagemSucesso('Lançamento deletado.')
            }).catch(erro => {               
                console.log(Object.getOwnPropertyNames(erro.response.data))
                messages.mensagemErro(erro.response.data);
            })
    }

    buscar = () => {

        if(!this.state.ano){
            messages.mensagemErro('O campo "ano" não foi preenchido!');
            return false;
        }

        const usuario = storage.obterItem('_usuario_logado')

        const filtro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuario.id,
        }

        this.service.consultar(filtro)
            .then(resp => {
                const lista = resp.data
                if( lista.length < 1 ) messages.mensagemAlerta('Nenhum resultado encontrado')
                this.setState({lancamentos: lista})
            }).catch(erro => {                
                messages.mensagemErro(erro.response.data);
            })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    alterarStatus = (lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos = this.state.lancamentos
                const index = lancamentos.indexOf(lancamento)
                if(index !== -1){
                    lancamento['status'] = status
                    lancamentos[index] = lancamento // Os 4 jeitos abaixo funcionaram e nao entendi o porque
                    this.setState({lancamentos}) // this.setState(lancamentos)  this.setState({lancamento}) this.setState(lancamento)
                }
                messages.mensagemSucesso('Status atualizado');
            }).catch(error => {
                messages.mensagemErro(error.response.data);
            })
    }
    
    render(){
        const meses = this.service.obterListaMeses()
        const tipos = this.service.obterListaTipos()

        return(
            <Card title="Consulta Lançamento">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">
                            <FormGroup label="Ano: *" htmlFor="inputAno">
                                <input id="inputAno" type="text" className="form-control" placeholder="Digite o ano"
                                    value={this.state.ano}                                     
                                    onChange={e => this.setState({ano:e.target.value})}/>
                            </FormGroup> 

                            <FormGroup label="Mes: " htmlFor="inputMes">
                                <SelectMenu id="inputMes" className="form-control" 
                                    lista={meses}                            
                                    value={this.state.mes}
                                    onChange={e => this.setState({mes:e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Descrição: " htmlFor="inputDesc">
                                <input type="text" id="inputDesc" className="form-control" placeholder="Digite a descrição"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({descricao:e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Tipo Lançamento: " htmlFor="inputTipo">
                                <SelectMenu id="inputTipo" className="form-control" 
                                        lista={tipos}                            
                                        value={this.state.tipo}
                                        onChange={e => this.setState({tipo:e.target.value})}/>                                                            
                            </FormGroup>                           
                            
                            <button onClick={this.buscar} type="button" className="btn btn-success">
                                <i className="pi pi-search-plus"/> Buscar
                            </button>
                            <button onClick={this.prepareCadastrar} type="button" className="btn btn-danger">
                                <i className="pi pi-plus-circle"/> Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <LancamentosTable linhas={this.state.lancamentos} 
                                deleteAction={this.confirmarDelecao} 
                                editAction={this.editar}
                                editStatus={this.alterarStatus}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(ConsultaLancamentos)