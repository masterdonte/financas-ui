import React from "react";
import Rotas from './rotas'
import Navbar from "../componentes/navbar"

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css'
import 'toastr/build/toastr.css'
import '../custom.css'

class App extends React.Component{

  render(){
    return(
      <>
        <Navbar/>
        <div class="container">
            <Rotas/>
        </div>
      </>
    );
  }
}

export default App;
