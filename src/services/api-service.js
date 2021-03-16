import axios from 'axios'

const http = axios.create({
    //baseURL: 'http://localhost:8080'
    baseURL: 'https://aerarium-api.herokuapp.com/'
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
        return http.put(url, objeto)
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
