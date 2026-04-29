/*
Promise chaining with .then()
Important idea:

Every .then() returns a new promise.
Whatever we return from one .then() becomes the input for the next .then().

If we return a normal value:
    next .then() receives that value.

If we return a promise:
    next .then() waits for that promise to resolve.
*/

function doSomething() {
    // Step 1:
    // doSomething() is called first.
    // It immediately returns a pending promise.
    // JavaScript does not wait here.
    return new Promise(function (resolve) {
        // Step 2:
        // The promise executor runs immediately.
        // setTimeout is registered, then control moves ahead.
        setTimeout(function () {
            // Step 5:
            // After 1 second, this callback enters the callback queue.
            // When the call stack is empty, it runs and resolves the promise.
            resolve(10);
        }, 1000);
    });
}

function doubleNumber(number) {
    // Step 8:
    // doubleNumber() is called from the first .then().
    // It immediately returns another pending promise.
    // The next .then() waits for this returned promise to resolve.
    return new Promise(function (resolve) {
        setTimeout(function () {
            // Step 9:
            // After 1 second, this promise resolves with number * 2.
            resolve(number * 2);
        }, 1000);
    });
}

function addFive(number) {
    // Step 11:
    // addFive() is synchronous.
    // It returns a normal value, not a promise.
    return number + 5;
}

// Step 3:
// doSomething() has already returned a promise.
// Now .then(), .then(), .then(), and .catch() are registered.
// These callbacks do not run now. They run later when the promise resolves.
doSomething()
    .then(function (result) {
        // Step 6:
        // The first promise was resolved with 10.
        // So this .then() receives result = 10.
        console.log("First result:", result);

        // Step 7:
        // We call doubleNumber(10).
        // Returning a promise, so the next .then() waits for it.
        return doubleNumber(result);
    })
    .then(function (result) {
        // Step 10:
        // doubleNumber() resolved with 20.
        // Now this .then() receives result = 20.
        console.log("After double:", result);

        // Step 12:
        // addFive(20) returns 25 immediately.
        // Returning a normal value, so the next .then() receives it directly.
        return addFive(result);
    })
    .then(function (result) {
        // Step 13:
        // The previous .then() returned 25.
        // So this .then() receives result = 25.
        console.log("After adding five:", result);
    })
    .catch(function (error) {
        // Step 14:
        // If any promise rejects or any .then() throws an error,
        // control jumps to this .catch().
        console.log("Something went wrong:", error);
    });

// Step 4:
// This line runs before any .then() callback,
// because promise work is asynchronous.
console.log("Promise chain registered");

/*
Output:

Promise chain registered
First result: 10
After double: 20
After adding five: 25
*/
