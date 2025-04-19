import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setEquation('');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
      setEquation(prevValue ? `${prevValue} ${operation} ${digit}` : String(digit));
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
      setEquation(prevValue ? `${prevValue} ${operation} ${display === '0' ? digit : display + digit}` : display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      setEquation(prevValue ? `${prevValue} ${operation} 0.` : '0.');
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
      setEquation(prevValue ? `${prevValue} ${operation} ${display + '.'}` : display + '.');
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
      setEquation(`${inputValue} ${nextOperation}`);
    } else if (operation) {
      const currentValue = prevValue || 0;
      let newValue = 0;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        default:
          break;
      }

      setPrevValue(newValue);
      setDisplay(String(newValue));
      setEquation(nextOperation ? `${newValue} ${nextOperation}` : `${currentValue} ${operation} ${inputValue} = ${newValue}`);
    } else {
      setEquation(`${inputValue} ${nextOperation}`);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    if (!operation) return;
    performOperation(null);
    setOperation(null);
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="equation">{equation}</div>
        <div className="result">{display}</div>
      </div>
      <div className="buttons">
        <button className="clear" onClick={clearAll}>AC</button>
        <button className="operator" onClick={() => performOperation('÷')}>÷</button>
        <button className="operator" onClick={() => performOperation('×')}>×</button>
        <button className="operator" onClick={() => performOperation('-')}>-</button>
        <button className="number" onClick={() => inputDigit(7)}>7</button>
        <button className="number" onClick={() => inputDigit(8)}>8</button>
        <button className="number" onClick={() => inputDigit(9)}>9</button>
        <button className="operator" onClick={() => performOperation('+')}>+</button>
        <button className="number" onClick={() => inputDigit(4)}>4</button>
        <button className="number" onClick={() => inputDigit(5)}>5</button>
        <button className="number" onClick={() => inputDigit(6)}>6</button>
        <button className="number" onClick={() => inputDigit(1)}>1</button>
        <button className="number" onClick={() => inputDigit(2)}>2</button>
        <button className="number" onClick={() => inputDigit(3)}>3</button>
        <button className="number zero" onClick={() => inputDigit(0)}>0</button>
        <button className="number" onClick={inputDecimal}>.</button>
        <button className="equals" onClick={handleEquals}>=</button>
      </div>
    </div>
  );
}

export default App;
