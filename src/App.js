import React from "react";

class App extends React.Component{

  state = {
    numero1 : '',
    numero2 : '',
    resultado : ''
  }

  somar = () => {
    const resultado = parseInt(this.state.numero1) + parseInt(this.state.numero2);
    this.setState({resultado: resultado});
  }

  render(){
    return(
      <div>
        <label>Digite o numero 1</label>
        <input type="text" value={this.state.numero1} onChange={(e) => this.setState({numero1 : e.target.value}) }/>
        <br/>
        <label>Digite o numero 2</label>
        <input type="text" value={this.state.numero2} onChange={(e) => this.setState({numero2 : e.target.value}) }/>
        <br/>
        <button onClick={this.somar}>Soma</button>
        <br/>
        O resultado da soma é {this.state.resultado}
      </div>
    );
  }
}

/*
function App() {
  return (
    <div>
      hello world!!
    </div>
  );
}
*/
export default App;
