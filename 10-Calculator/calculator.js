const isOperator = /[-+*/]/;
const notMinus = /[+*/]/;

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currInput: "0",
      accInput: ""
    };

    this.clear = this.clear.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleDot = this.handleDot.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  clear() {
    this.setState({
      currInput: "0",
      accInput: ""
    });
  }

  handleNumber(event) {
    const currInput = this.state.currInput;
    const currNum = event.target.value;

    if (isOperator.test(currInput)) {
      this.setState({
        currInput: currNum,
        accInput: this.state.accInput + currNum
      });
    } else if (currInput == 0) {
      if (currNum != 0) {
        this.setState({
          currInput: currNum,
          accInput: this.state.accInput + currNum
        });
      }
    } else {
      this.setState({
        currInput: currInput + currNum,
        accInput: this.state.accInput + currNum
      });
    }
  }

  handleDot() {
    const currInput = this.state.currInput;
    if (!isOperator.test(currInput) && !currInput.includes(".")) {
      this.setState({
        currInput: currInput + ".",
        accInput: this.state.accInput + (this.state.accInput == "" ? "0." : ".")
      });
    }
  }

  handleOperator(event) {
    let currOperator = event.target.value;
    let acc = this.state.accInput;

    if (acc === "") {
      acc = "0";
    } else if (acc[acc.length - 1] === ".") {
        acc = acc.slice(0, acc.length - 1);
    } else if (isOperator.test(acc[acc.length -2]) && isOperator.test(acc[acc.length -1])) {
        acc = acc.slice(0, acc.length - 2);
    } else if (isOperator.test(acc[acc.length - 1])) {
        if(!notMinus.test(acc[acc.length -1]) && !notMinus.test(currOperator)) {
          acc = acc.slice(0, acc.length - 1);
        } else if(notMinus.test(currOperator)) {
          acc = acc.slice(0, acc.length - 1);
        }
    }

    this.setState({
      currInput: currOperator,
      accInput: acc + currOperator
    });
  }
  
  calculate() {
    let formula = this.state.accInput;
    if (isOperator.test(formula[formula.length - 1])) {
      formula = formula.slice(0, formula.length - 1);
    }
    let result = eval(formula);
    this.setState({
      currInput: result,
      accInput: result
    });
  }
  
  render() {
    return (
      <div id="container">
        <div id="screen">
          <p>{this.state.accInput}</p>
          <p id="display">{this.state.currInput}</p></div>
        <div id="keyboard">
          <button onClick={this.clear} id="clear" value="clear">AC</button>
          <button onClick={this.handleNumber} id="seven" value="7">7</button>
          <button onClick={this.handleNumber} id="eight" value="8">8</button>
          <button onClick={this.handleNumber} id="nine" value="9">9</button>
          <button onClick={this.handleOperator} id="add" value="+">+</button>
          <button onClick={this.handleNumber} id="four" value="4">4</button>
          <button onClick={this.handleNumber} id="five" value="5">5</button>
          <button onClick={this.handleNumber} id="six" value="6">6</button>
          <button onClick={this.handleOperator} id="subtract" value="-">-</button>
          <button onClick={this.handleNumber} id="one" value="1">1</button>
          <button onClick={this.handleNumber} id="two" value="2">2</button>
          <button onClick={this.handleNumber} id="three" value="3">3</button>
          <button onClick={this.handleOperator} id="multiply" value="*">x</button>
          <button onClick={this.handleNumber} id="zero" value="0">0</button>
          <button onClick={this.handleDot} id="decimal" value=".">.</button>
          <button onClick={this.calculate} id="equals" value="=">=</button>
          <button onClick={this.handleOperator} id="divide" value="/">/</button> 
        </div>
      </div>
    )
  };
}
ReactDOM.render(<Calculator />, document.getElementById("app"));