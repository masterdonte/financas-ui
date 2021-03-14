import ApiService from './api-service'
import ErroValidacao from './erro-validacao'

class LancamentoService extends ApiService{

    constructor(){
        super('/api/lancamentos')
    }

    obterListaMeses(){
        return [
            {label: 'Selecione', value: ''},
            {label: 'Janeiro',   value: 1},
            {label: 'Fevereiro', value: 2},
            {label: 'Março',     value: 3},
            {label: 'Abril',     value: 4},
            {label: 'Maio',      value: 5},
            {label: 'Junho',     value: 6},
            {label: 'Julho',     value: 7},
            {label: 'Agosto',    value: 8},
            {label: 'Setembro',  value: 9},
            {label: 'Outubro',   value: 10},
            {label: 'Novembro',  value: 11},
            {label: 'Dezembro',  value: 12}
        ]
    }

    obterListaTipos(){
        return [
            {label: 'Selecione', value: ''},
            {label: 'Receita',  value: 'RECEITA'},
            {label: 'Despesa',  value: 'DESPESA'}
        ]
    }

    alterarStatus(id, status){
        // const lancamento = {status : status}// => lancamento = { status }
        return this.put(`/${id}/status`, {status})
    }

    validar(lanc){
        const erros = []

        if(!lanc.descricao){
            erros.push('Informe a Descrição.')
        }

        if(!lanc.ano){
            erros.push('Informe a Ano.')
        }

        if(!lanc.mes){
            erros.push('Informe a Mês.')
        }

        if(!lanc.valor){
            erros.push('Informe a Valor.')
        }

        if(!lanc.tipo){
            erros.push('Informe a Tipo.')
        }

        if(erros && erros.length > 0)
            throw new ErroValidacao(erros)

    }

    obterPorId(id){
        return this.get(`/${id}`)
    }

    salvar(lancamento){
        if(lancamento.id)
            return this.put(`/${lancamento.id}`, lancamento)
        else
            return this.post('/', lancamento)
    }

    consultar(filtro){
        let recurso = `?usuario=${filtro.usuario}`
       
        if(filtro.ano)
            recurso = `${recurso}&ano=${filtro.ano}`

        if(filtro.mes)
            recurso = `${recurso}&mes=${filtro.mes}`

        if(filtro.tipo)
            recurso = `${recurso}&tipo=${filtro.tipo}`

        if(filtro.status)
            recurso = `${recurso}&status=${filtro.status}`
   
        if(filtro.descricao)
            recurso = `${recurso}&descricao=${filtro.descricao}`

        return this.get(recurso);
    }

    deletar(id){
        return this.delete(`/${id}`)
    }    
}

export default LancamentoService