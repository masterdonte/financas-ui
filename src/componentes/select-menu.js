import React from 'react'

const select = (props) => {
    
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

export default select
// index => para o Dom do react poder mapear cada item corretmente e tb nao reclamar no console
// spread operator => joga todas as propriedades passadas diretamente para o componente