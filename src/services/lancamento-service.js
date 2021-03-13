import ApiService from './api-service'

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
            {label: 'AMio',      value: 5},
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

    salvar(lancamento){
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