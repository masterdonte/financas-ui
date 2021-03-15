import React from 'react'

import {Switch, HashRouter, Route, Redirect} from 'react-router-dom'

import Home from '../views/home'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastro-usuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamento'
import { AuthConsumer } from '../services/provider-auth'

function RotaAutenticada({component:Component, isAutenticado, ...props}){
    return(
        <Route {...props} 
            render={ (componentProps) => {
                if(isAutenticado){
                    return( <Component { ...componentProps } /> )
                }else{// O from abaixo serve para manter o historico de navegacao(url) quando o usuário nao auteticado tentar acessar uma url protegida
                    return( <Redirect to={ { pathname: '/login', state: { from: componentProps.location } } } /> )
                }
            }}
        />
    )
}

function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}/>
                <RotaAutenticada isAutenticado={props.authenticated} path="/home" component={ Home }/>
                <RotaAutenticada isAutenticado={props.authenticated} path="/consulta-lancamentos" component={ConsultaLancamentos}/> 
                <RotaAutenticada isAutenticado={props.authenticated} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos}/>                
            </Switch>
        </HashRouter>
    )
}

const consumer = ()  => (
    <AuthConsumer>
        { (context)=>(<Rotas authenticated={context.isAutenticado} />) }
    </AuthConsumer>
)

export default consumer