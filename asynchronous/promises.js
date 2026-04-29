/*
PROMISES

In JavaScript, a Promise is a special object that represents a future result.

A promise is returned immediately, even if the work is not completed yet.
It acts like a placeholder for data that we expect to receive later.

Promises help us attach functionality that should run after an async task is done.
They improve readability and help solve inversion of control.

Example:

const response = fetch("https://example.com/data");

fetch() immediately returns a Promise. Later, that promise will either be
fulfilled with data or rejected with an error.

1. How can we create a Promise?

Promise creation is synchronous. This means the executor function inside
new Promise() runs immediately.

Syntax:

const promise = new Promise(function (resolve, reject) {
    // Write async or sync work here.

    // Call resolve(value) when the task is successful.
    // Call reject(error) when the task fails.
});

Three states of a Promise:

1. pending   -> default state; task is still in progress
2. fulfilled -> task completed successfully; resolve() was called
3. rejected  -> task failed; reject() was called

Promise value:

1. pending   -> value is undefined
2. fulfilled -> value is the argument passed to resolve()
3. rejected  -> value is the argument passed to reject()

Important points:

1. resolve() and reject() accept only one useful value.
2. A promise can settle only once.
3. After resolve() or reject() is called, later calls are ignored.
4. Use .then() to handle success.
5. Use .catch() to handle failure.
6. Use .finally() to run code after success or failure.
*/
/*
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function createPromiseWithTimeout() {
    return new Promise(function (resolve, reject) {
        console.log("Promise executor started");

        setTimeout(function () {
            const number = getRandomInt(10);

            if (number % 2 === 0) {
                resolve({
                    number: number,
                    message: "Success: number is even",
                });
                return;
            }

            reject({
                number: number,
                message: "Error: number is odd",
            });
        }, 500);
      
    });
}

const promiseResult = createPromiseWithTimeout();

console.log("Promise returned immediately:", promiseResult);

promiseResult
    .then(function (result) {
        console.log(result.message);
        console.log("Resolved value:", result.number);
    })
    .catch(function (error) {
        console.log(error.message);
        console.log("Rejected value:", error.number);
    })
    .finally(function () {
        console.log("Promise completed");
    });
*/
/*
2. What does a Promise store internally?

A promise mainly keeps track of these things:

1. Promise status
   - pending
   - fulfilled
  - rejected

2. Promise value
   - undefined while pending
   - resolve(value) when fulfilled
   - reject(error) when rejected

3. Fulfillment handlers
   - functions registered using .then()
   - they run when the promise is fulfilled

4. Rejection handlers
   - functions registered using .catch()
   - they run when the promise is rejected

Example:

promiseResult.then(function (result) {
    console.log(result);
});

The function passed to .then() is not executed immediately.
It is registered inside the promise and runs later when the promise is resolved.

.catch() works the same way, but for rejected promises.
.finally() runs in both cases: success or failure.

3-> Promise callbacks and the microtask queue

JavaSffcript has different queues for async code:

1. Microtask queue
   - Promise .then(), .catch(), and .finally() callbacks go here.

2. Callback queue / macrotask queue
   - setTimeout(), setInterval(), DOM events, etc. go here.

The microtask queue has higher priority than the callback queue.
That is why promise callbacks run before setTimeout callbacks,
even if setTimeout has 0 milliseconds delay.
*/
/*
console.log("A: synchronous code starts");

setTimeout(function () {
    console.log("D: setTimeout callback runs");
}, 0);

Promise.resolve().then(function () {
    console.log("C: promise then callback runs");
});

console.log("B: synchronous code ends");
*/

//////////////////////////////////////////////////////////////////////////////

/*
4. How do Promises solve the inversion of control problem?

Inversion of control means:

We give our callback function to another function, and now that other function
controls when, how many times, and whether our callback will be called.

With callbacks, we depend on the other function to call our callback correctly.

Problems with callbacks:

1. The callback may never be called.
2. The callback may be called multiple times.
3. The callback may be called too early or too late.
4. Error handling can become messy.

Promises fix this by returning a promise object immediately.
Now we do not give control of our next step directly to another function.
Instead, we attach our next step using .then() and .catch().
*/
/*
// Callback style
function downloadFileCallback(url, callback) {
    console.log("Callback download started from:", url);

    setTimeout(function () {
        const content = "dummy file content";
        callback(content);
    }, 1000);
}

function handleDownloadedContent(content) {
    console.log("Callback downloaded data:", content);
}

downloadFileCallback("https://example.com/file.txt", handleDownloadedContent);

// Promise style
function downloadFilePromise(url) {
    return new Promise(function (resolve, reject) {
        console.log("Promise download started from:", url);

        setTimeout(function () {
            const isDownloadSuccessful = true;

            if (isDownloadSuccessful) {
                const content = "dummy file content";
                resolve(content);
                return;
            }

            reject("Download failed");
        }, 1000);
    });
}

const downloadPromise = downloadFilePromise("https://example.com/file.txt");

downloadPromise
    .then(function (content) {
        console.log("Promise downloaded data:", content);
    })
    .catch(function (error) {
        console.log("Promise error:", error);
    });
*/
/*
Main difference:

Callback:
downloadFileCallback(url, callback)

Here, we give our callback to the function.

Promise:
downloadFilePromise(url).then(callback)

Here, the function gives us a promise, and we decide what should happen next.
*/
