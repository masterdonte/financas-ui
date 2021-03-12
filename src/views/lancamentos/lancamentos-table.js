import React from 'react'
import currencyFormatter from 'currency-formatter'
export default (props) => {

    const rows = props.linhas.map( (lanc) => {
        return (
            <tr key={lanc.id}>
                <th scope="row">{lanc.descricao}</th>
                <td>{ currencyFormatter.format(lanc.valor, { locale: 'pt-BR' } ) }</td>
                <td>{lanc.tipo}</td>
                <td>{lanc.mes}</td>
                <td>{lanc.status}</td>
                <td>
                    <button type="button" className="btn btn-primary" onClick={e => props.editAction(lanc)}>Editar</button>
                    <button type="button" className="btn btn-danger"  onClick={e => props.deleteAction(lanc)}>Deletar</button>
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