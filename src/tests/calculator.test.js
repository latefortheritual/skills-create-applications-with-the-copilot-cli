const test = require('node:test');
const assert = require('node:assert/strict');

const { addition, subtraction, multiplication, division, calculate } = require('../calculator.js');

test('addition adds the image example and supports negative and decimal values', () => {
  assert.equal(addition(2, 3), 5);
  assert.equal(addition(-2, 5), 3);
  assert.ok(Math.abs(addition(0.1, 0.2) - 0.3) < Number.EPSILON);
  assert.equal(addition(0, 7), 7);
});

test('subtraction subtracts the image example and supports negative values', () => {
  assert.equal(subtraction(10, 4), 6);
  assert.equal(subtraction(3, 10), -7);
  assert.equal(subtraction(-2, -5), 3);
  assert.equal(subtraction(7, 0), 7);
});

test('multiplication multiplies the image example and handles zero and negatives', () => {
  assert.equal(multiplication(45, 2), 90);
  assert.equal(multiplication(-3, 4), -12);
  assert.equal(multiplication(0, 100), 0);
  assert.equal(multiplication(1.5, 2), 3);
});

test('division divides the image example and supports fractional results', () => {
  assert.equal(division(20, 4), 5);
  assert.equal(division(9, 2), 4.5);
  assert.equal(division(-12, 3), -4);
  assert.equal(division(0, 8), 0);
});

test('division throws on zero divisor', () => {
  assert.throws(() => division(5, 0), /Division by zero/);
  assert.throws(() => division(5, -0), /Division by zero/);
});

test('operations accept numeric strings from CLI arguments', () => {
  assert.equal(addition('2', '3'), 5);
  assert.equal(subtraction('10', '4'), 6);
  assert.equal(multiplication('45', '2'), 90);
  assert.equal(division('20', '5'), 4);
});

test('calculate dispatches image examples using operation names and symbols', () => {
  assert.equal(calculate('addition', 2, 3), 5);
  assert.equal(calculate('-', 10, 4), 6);
  assert.equal(calculate('*', 45, 2), 90);
  assert.equal(calculate('/', 20, 5), 4);
});

test('calculate accepts supported operation aliases case-insensitively', () => {
  assert.equal(calculate('ADD', 2, 3), 5);
  assert.equal(calculate('subtract', 10, 4), 6);
  assert.equal(calculate('multiply', 45, 2), 90);
  assert.equal(calculate('divide', 20, 5), 4);
});

test('operations reject non-finite or missing operands', () => {
  assert.throws(() => addition('not a number', 1), /valid finite number/);
  assert.throws(() => subtraction(Infinity, 1), /valid finite number/);
  assert.throws(() => multiplication(1, NaN), /valid finite number/);
  assert.throws(() => division(1, undefined), /valid finite number/);
});

test('calculate rejects unsupported operations', () => {
  assert.throws(() => calculate('modulo', 5, 2), /Unsupported operation: modulo/);
  assert.throws(() => calculate('', 5, 2), /Unsupported operation/);
});
