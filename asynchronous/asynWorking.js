// This function is synchronous.
// It blocks the call stack until the loop finishes.
function timeConsumingLoop(label) {
  console.log(`${label}: loop started`);

  for (let i = 0; i < 10000000000; i++) {
    // Simulate heavy work.
  }

  console.log(`${label}: loop finished`);
}

// This function registers a callback in the timer system.
// The callback will go to the callback queue after about 5 seconds.
function scheduleFiveSecondTimer() {
  console.log('5-second timer scheduled');

  setTimeout(() => {
    console.log('5-second timer callback is now running');
  }, 5000);
}

// Even with 0 ms, the callback does not run immediately.
// It is still placed in the callback queue and runs only after
// the call stack becomes empty.
function scheduleZeroSecondTimer() {
  console.log('0ms timer scheduled');

  setTimeout(() => {
    console.log('0ms timer callback is now running');
  }, 0);
}

console.log('Program started');

// 1. This goes to the call stack and blocks everything else.
timeConsumingLoop('First');

// 2. Timer callback is registered by Node runtime, but it does not
//    enter the call stack right now.
scheduleFiveSecondTimer();

// 3. This timer also waits outside the call stack.
scheduleZeroSecondTimer();

// 4. Synchronous work runs again and still blocks callbacks.
timeConsumingLoop('Second');

console.log('Program finished synchronous code');


// output :- 
// Program started
// First: loop started
// First: loop finished
// 5-second timer scheduled
// 0ms timer scheduled
// Second: loop started
// Second: loop finished
// Program finished synchronous code
// 0ms timer callback is now running
// 5-second timer callback is now running
