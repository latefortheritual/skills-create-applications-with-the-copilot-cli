// Calculator supports the following operations:
// addition, subtraction, multiplication, division, modulo, power, and square root.

function normalizeNumber(value, label) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a valid finite number.`);
  }

  return number;
}

function addition(a, b) {
  return normalizeNumber(a, 'addition operand a') + normalizeNumber(b, 'addition operand b');
}

function subtraction(a, b) {
  return normalizeNumber(a, 'subtraction operand a') - normalizeNumber(b, 'subtraction operand b');
}

function multiplication(a, b) {
  return normalizeNumber(a, 'multiplication operand a') * normalizeNumber(b, 'multiplication operand b');
}

function division(a, b) {
  const left = normalizeNumber(a, 'division operand a');
  const right = normalizeNumber(b, 'division operand b');

  if (right === 0) {
    throw new Error('Division by zero is not allowed.');
  }

  return left / right;
}

function modulo(a, b) {
  const left = normalizeNumber(a, 'modulo operand a');
  const right = normalizeNumber(b, 'modulo operand b');

  if (right === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return left % right;
}

function power(base, exponent) {
  return Math.pow(
    normalizeNumber(base, 'power base'),
    normalizeNumber(exponent, 'power exponent')
  );
}

function squareRoot(n) {
  const number = normalizeNumber(n, 'square root operand');

  if (number < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }

  return Math.sqrt(number);
}

function calculate(operation, ...args) {
  const normalizedOperation = operation && String(operation).trim().toLowerCase();

  switch (normalizedOperation) {
    case 'addition':
    case 'add':
    case '+':
      return addition(args[0], args[1]);
    case 'subtraction':
    case 'subtract':
    case '-':
      return subtraction(args[0], args[1]);
    case 'multiplication':
    case 'multiply':
    case '*':
      return multiplication(args[0], args[1]);
    case 'division':
    case 'divide':
    case '/':
      return division(args[0], args[1]);
    case 'modulo':
    case 'mod':
    case '%':
      return modulo(args[0], args[1]);
    case 'power':
    case 'exponentiation':
    case '^':
      return power(args[0], args[1]);
    case 'squareroot':
    case 'square root':
    case 'sqrt':
      return squareRoot(args[0]);
    default:
      throw new Error(
        `Unsupported operation: ${operation}. Supported operations: addition, subtraction, multiplication, division, modulo, power, square root.`
      );
  }
}

if (require.main === module) {
  const [, , operation, first, second] = process.argv;

  try {
    if (!operation) {
      console.error('Usage: node src/calculator.js <operation> <value1> <value2>');
      console.error(
        'Supported operations: addition, subtraction, multiplication, division, modulo, power, square root'
      );
      process.exit(1);
    }

    const result = calculate(operation, first, second);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
};
