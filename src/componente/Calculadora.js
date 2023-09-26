import React,{ Component } from 'react';

class Calculadora extends Component{
  constructor(){
    super();
    this.state = {
      valorEnPantalla: '0',
      operador: null,
      primerValor:null ,
      segundoValor: false,
    };
  }
  ingresarDigito(digito){
    const { valorEnPantalla, segundoValor } = this.state;
    if (segundoValor) {
      this.setState({
        valorEnPantalla: String(digito),
        segundoValor: false,
      });
    } else {
      this.setState({
        valorEnPantalla: valorEnPantalla === '0' ? String(digito) : valorEnPantalla + digito,
      });
    }
  }
  ingresarDecimal() {
    const { valorEnPantalla } = this.state;

    if (!valorEnPantalla.includes('.')) {
      this.setState({
        valorEnPantalla: valorEnPantalla + '.',
        segundoValor: false,
      });
    }
  }

  borrarPantalla() {
    this.setState({
      valorEnPantalla: '0',
      operador: null,
      primerValor: null,
      segundoValor: false,
    });
  }

  establecerOperador(operador) {
    const { valorEnPantalla, primerValor, segundoValor } = this.state;
    if (primerValor !== null && !segundoValor) {  
      this.setState({
        operador: operador,
      });
    } else if (primerValor !== null && segundoValor) {
      this.mostrarResultado();
      this.setState({
        operador: operador,
        segundoValor: false, 
      });
    } else {
      this.setState({
        primerValor: valorEnPantalla,
        operador: operador,
        valorEnPantalla: '', 
        segundoValor: true, 
      });
    }
  }
  

  calcular() {
    const { valorEnPantalla, primerValor, operador } = this.state;
    const primerNumero = parseFloat(primerValor);
    const segundoNumero = parseFloat(valorEnPantalla);

    switch (operador) {
      case '+':
        return primerNumero + segundoNumero;
      case '-':
        return primerNumero - segundoNumero;
      case '*':
        return primerNumero * segundoNumero;
      case '/':
        return primerNumero / segundoNumero;
      case '%':
        return (primerNumero / 100) * segundoNumero;
      default:
        return segundoNumero;
    }
  }

  mostrarResultado(){
    const resultado = this.calcular();
    this.setState({
        valorEnPantalla: String(resultado),
        primerValor: null,
        operador: null,
        segundoValor: false,
    });
  }

  render() {
    const { valorEnPantalla } = this.state;

    return (
      <div className="calculadora">
        <div className="pantalla">{this.state.primerValor}{this.state.operador}{this.state.valorEnPantalla}</div>
        <div className="teclado">
          <div className="fila">
            <button onClick={() => this.borrarPantalla()}>C</button>
            <button onClick={() => this.establecerOperador('%')}>%</button>
            <button onClick={() => this.establecerOperador('/')}>/</button>
          </div>
          <div className="fila">
          <button onClick={() => this.ingresarDigito(7)}>7</button>
            <button onClick={() => this.ingresarDigito(8)}>8</button>
            <button onClick={() => this.ingresarDigito(9)}>9</button>
            <button onClick={() => this.establecerOperador('*')}>*</button>
          </div>
          <div className="fila">
          <button onClick={() => this.ingresarDigito(4)}>4</button>
            <button onClick={() => this.ingresarDigito(5)}>5</button>
            <button onClick={() => this.ingresarDigito(6)}>6</button>
            <button onClick={() => this.establecerOperador('+')}>+</button>
          </div>
          <div className="fila">
          <button onClick={() => this.ingresarDigito(1)}>1</button>
            <button onClick={() => this.ingresarDigito(2)}>2</button>
            <button onClick={() => this.ingresarDigito(3)}>3</button>
            <button onClick={() => this.establecerOperador('-')}>-</button>         
            
          </div>
          <div className="fila">
          <button onClick={() => this.ingresarDigito(0)}>0</button>
            <button onClick={() => this.ingresarDecimal()}>.</button>
            <button onClick={() => this.mostrarResultado()}>=</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculadora;
