import React from "react";
import Rotas from './rotas'
import Navbar from '../componentes/navbar'
import ProviderAuth from '../services/provider-auth'

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css'
import 'toastr/build/toastr.css'
import '../custom.css'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends React.Component{

  render(){
    return(
      <ProviderAuth>
        <Navbar/>
        <div className="container">
            <Rotas/>
        </div>
      </ProviderAuth>     
    );
  }
}

export default App;
