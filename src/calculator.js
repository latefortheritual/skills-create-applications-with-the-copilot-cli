// Calculator supports the following operations:
// addition, subtraction, multiplication, and division.

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
    default:
      throw new Error(
        `Unsupported operation: ${operation}. Supported operations: addition, subtraction, multiplication, division.`
      );
  }
}

if (require.main === module) {
  const [, , operation, first, second] = process.argv;

  try {
    if (!operation) {
      console.error('Usage: node src/calculator.js <operation> <value1> <value2>');
      console.error('Supported operations: addition, subtraction, multiplication, division');
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
  calculate,
};
