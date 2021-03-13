import axios from 'axios'

const http = axios.create({
    //baseURL: 'http://localhost:8080'
    baseURL: 'http://10.10.2.131:8080'
})

class ApiService{

    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(recurso, objeto){
        const url = `${this.apiurl}${recurso}`
        return http.post(url, objeto)
    }

    put(recurso, objeto){
        const url = `${this.apiurl}${recurso}`
        return http.post(url, objeto)
    }

    delete(recurso){
        const url = `${this.apiurl}${recurso}`
        return http.delete(url)
    }

    get(recurso){
        const url = `${this.apiurl}${recurso}`
        return http.get(url)
    }
}

export default ApiService;
