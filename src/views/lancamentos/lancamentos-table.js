import React from 'react'
import currencyFormatter from 'currency-formatter'

const table = (props) => {

    const rows = props.linhas.map( (lanc) => {
        return (
            <tr key={lanc.id}>
                <th scope="row">{lanc.descricao}</th>
                <td>{ currencyFormatter.format(lanc.valor, { locale: 'pt-BR' } ) }</td>
                <td>{lanc.tipo}</td>
                <td>{lanc.mes}</td>
                <td>{lanc.status}</td>
                <td>
                    <button type="button" className="btn btn-success" title="Efetivar"
                            disabled={lanc.status !== 'PENDENTE'}
                            onClick={e => props.editStatus(lanc, 'EFETIVADO')}>
                            <i className="pi pi-check"></i>
                    </button>
                    <button type="button" className="btn btn-warning" title="Cancelar"
                            disabled={lanc.status !== 'PENDENTE'}
                            onClick={e => props.editStatus(lanc, 'CANCELADO')}>
                            <i className="pi pi-times"></i>
                    </button>
                    <button type="button" className="btn btn-primary" title="Editar"
                            onClick={e => props.editAction(lanc.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" className="btn btn-danger" title="Deletar"
                            onClick={e => props.deleteAction(lanc)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })

    
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mes</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
               {rows}
            </tbody>
        </table>        
    )

}

export default table // o export pode ser implicito tambem exportando diretamente a funcao