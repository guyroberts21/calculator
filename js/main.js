const createCalculator = () => ({
  display: '0',
  num1: '',
  num2: '',
  hasInputNum1: false,
  operator: null,
});

let calculator = createCalculator();

// Dom Elements
const display = document.querySelector('.calculator-display');

const plus = (a, b) => a + b;
const minus = (a, b) => a - b;
const times = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, b, operator) {
  if (operator === 'plus') return plus(a, b);
  else if (operator === 'minus') return minus(a, b);
  else if (operator === 'times') return times(a, b);
  else if (operator === 'divide') return divide(a, b);
}

function formatNum(n) {
  // always return to 2d.p.
  return (Math.round(n * 100) / 100).toFixed(1);
}

function resetCalculator() {}

function updateDisplay(input) {
  display.textContent = input;
}

function inputNumber(e) {
  const num = e.target.textContent;

  if (num === 'AC') {
    calculator = createCalculator();
  } else {
    if (!calculator.hasInputNum1) {
      calculator.num1 += num;
      calculator.display = calculator.num1;
    } else {
      calculator.num2 += num;
      calculator.display = calculator.num2;
    }
  }

  // Update display
  updateDisplay(calculator.display);
}

function inputOperator(e) {
  if (e.target.value === 'equals') {
    calculate(calculator);
    return;
  }

  let { num1, operator } = calculator;
  if (!num1) return false;

  if (operator) {
    calculate(calculator);
  }

  let op = e.target.value;
  calculator.operator = op;

  calculator.hasInputNum1 = true;
}

function calculate(c) {
  // stop fn if no second num
  if (!c.num2) return false;

  const result = operate(Number(c.num1), Number(c.num2), c.operator);

  // reset num1 and reassign num1 (needs to be separate function)
  calculator.num1 = result;
  calculator.num2 = '';

  updateDisplay(formatNum(result));
}

// Event listeners
const numberBtns = document.querySelectorAll('.calculator-keys .number');
numberBtns.forEach((num) => num.addEventListener('click', inputNumber));

const opBtns = document.querySelectorAll('.calculator-keys .operator');
opBtns.forEach((op) => op.addEventListener('click', inputOperator));
