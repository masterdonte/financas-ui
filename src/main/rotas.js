import React from 'react'

import {Switch, HashRouter, Route} from 'react-router-dom'

import Home from '../views/home'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastro-usuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamento'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={ Home }/>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}/>
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos}/> 
                <Route path="/cadastro-lancamentos/:id?" component={CadastroLancamentos}/>                
            </Switch>
        </HashRouter>
    )
}

export default Rotas