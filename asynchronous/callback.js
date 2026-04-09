// Higher-order function:
// A higher-order function is a function that takes another function as an argument
// or returns a function.

// Callback function:
// A callback function is a function that we pass into another function,
// and that function executes it later.

// Example 1:
// intro() is a higher-order function because it receives ageCallback.
function intro(name, ageCallback) {
  console.log('Name:', name);
  console.log('Age:', ageCallback());
}

// getAge() is a callback function because we pass it into intro().
function getAge() {
  return 21;
}

// Pass the function itself, not getAge().
intro('Abhay', getAge);


// Example 2:
// sort() also uses a callback.
const numbers = [1, 2, 100, 99, 45, 900, 234, 234, 83, 21];

numbers.sort(function (a, b) {
  return a - b;
});

console.log('After sort:', numbers);

// Example 3:
// identity() is a higher-order function because it takes fun as an argument.
function identity(name, fun) {
  console.log('Inside identity:', name);
  fun(name, 22);
}

// This anonymous function is a callback function.
identity('aditya', function (firstName, age) {
  console.log(`My name is ${firstName} and I am ${age} years old.`);
});

// Example 4:
// map() also uses a callback.
const values = [1, 2, 3, 4];

const doubledValues = values.map(function (value) {
  return value * 2;
});

console.log('Original values:', values);
console.log('Doubled values:', doubledValues);
///////////////////////////////////////////////////////////////////////////////////////////

// Problems with callbacks:

// 1. Inversion of control:
// When we give our callback to another function,
// then that function controls when, how, and whether our callback runs.
// So control is in the hands of that higher-order function.

function doTask(callback) {
  const success = true;

  if (success) {
    callback('Task completed');
  }
}

doTask(function (message) {
  console.log('Inversion of control example:', message);
});

// 2. Callback hell:
// Callback hell is mainly a readability problem.
// When many callbacks are nested inside each other,
// the code becomes hard to read, hard to debug, and hard to maintain.
function step1(callback) {
  callback('Step 1 done');
}

function step2(callback) {
  callback('Step 2 done');
}

function step3(callback) {
  callback('Step 3 done');
}

step1(function (msg1) {
  console.log(msg1);
  step2(function (msg2) {
    console.log(msg2);
    step3(function (msg3) {
      console.log(msg3);
    });
  });
});
