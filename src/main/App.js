import React from "react";
import Rotas from './rotas'

import '../custom.css'
import 'bootswatch/dist/flatly/bootstrap.css'
import Navbar from "../componentes/navbar";

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
