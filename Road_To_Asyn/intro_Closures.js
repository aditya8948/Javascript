//CLOSURES

function process() {
    let count = 0;

    function innerProcess() {
        count += 1;
        return count;
    }

    return innerProcess;
}

const res = process();

// process() has already finished executing here.
// But it returned innerProcess, so now res is referring to innerProcess.

console.log("first time calling", res());
console.log("second time calling", res());
console.log("third time calling", res());

// Output:
// first time calling 1
// second time calling 2
// third time calling 3

// Why is count not becoming 0 every time?
//
// count is declared inside process(), so normally we may think it should disappear
// after process() finishes execution.
//
// But innerProcess uses count from its outer function scope.
// When process() returns innerProcess, JavaScript does not remove count from memory,
// because the returned function still needs it.
//
// This is called a closure.
//
// Definition:
// A closure is the ability of a function to remember and access variables from
// its outer lexical scope, even after that outer function has finished executing
//
// In simple words:
// Closure means a function remembers the variables from its outer function that
// are used inside it, even after the outer function is finished.
//
// Note:
// Closure is not of a function lexactly a normal property ike name or length.
// It is a behavior of JavaScript functions where the function carries access to
// the outer variables it needs.
//
// What is lexical scope?
//
// Lexical scope means the scope of a variable is decided by where the code is
// physically written in the file.
//
// "Lexical" means related to the written structure of the code.
// So JavaScript checks the position of functions and variables in the code to
// decide which variables are accessible.
//
// Example:
//
// function outer() {
//     let message = "hello";
//
//     function inner() {
//         console.log(message);
//     }
//
//     inner();
// }
//
// In this example, inner() can access message because inner() is written inside
// outer(). That is lexical scope.
//
// The important point is:
// Scope depends on where a function is written, not where it is called.
//
// Closure is connected to lexical scope.
// Because innerProcess is written inside process(), it has lexical access to
// count. When innerProcess is returned from process(), it still keeps that access.
// That remembered access is called closure.
//
// So in this example:
// - process() creates count.
// - innerProcess uses count.
// - process() returns innerProcess.
// - res stores the returned innerProcess function.
// - Every time res() runs, it accesses the same count variable.
//
// That is why the value increases like this:
// 1 -> 2 -> 3
//
// Important:
// JavaScript does not copy the value of count into innerProcess.
// Instead, innerProcess keeps a reference to the actual count variable.
// That is why count can keep changing across multiple function calls.
