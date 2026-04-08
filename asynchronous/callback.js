// Higher-order function:
// A function that takes another function as an argument.

// This function receives a name and a callback function.
function intro(name, ageCallback) {
  console.log(name);

  // Call the callback function and print the returned age.
  console.log(ageCallback());
}

// Callback function:
// This function is passed into another function as an argument.
function getAge() {
  return 21;
}

// Pass the function itself, not getAge().
intro('Abhay', getAge);

// Many built-in methods also use callbacks, such as:
// sort(), map(), filter(), reduce()

const numbers = [1, 2, 100, 99, 45, 900, 234, 234, 83, 21];

// Default sort() converts numbers to strings and sorts them
// in lexicographical (dictionary) order.
console.log(numbers);

// To sort numbers correctly, we pass a callback function.
numbers.sort(function (a, b) {
  // If result is negative, 'a' comes before 'b'.
  // If result is positive, 'b' comes before 'a'.
  // If result is 0, their order stays the same.
  return a - b;
});

// Now the array is sorted in ascending numeric order.
console.log(numbers);
