import React from 'react'

export default (props) => {
    
    const options = props.lista.map( (option, index) => {
        return (
            <option key={index} value={option.value}>{option.label}</option>
        )
    })

    return (
        <select {...props}>
            {options}
        </select>
    )
}
// index => para o Dom do react poder mapear cada item corretmente e tb nao reclamar no console
// spread operator => joga todas as propriedades passadas diretamente para o componente