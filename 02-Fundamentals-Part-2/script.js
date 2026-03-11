// **“use strict”** is a JavaScript directive that **forces you to write cleaner and safer code by
//  catching errors** (like using variables without declaring them).


'use strict';   // we can use it by writing this line 

/*
// ! Function => a function in javascript is a block of code that perform specific task and runs when it is called 

// function functionName(parameters) {
//     // code to be executed
// }

// example 

function add(a, b) {
    return a + b;
}

let result = add(5, 3);
console.log(result) ; // Output: 8

// function declaration  => Defined using function with a name
function calcAge(birthday) {
    const age = 2037;
    return age - birthday;
}
const age1 = calcAge(1991);

// function expression => function stored in a variable

const calcAge2 = function(birthyear){
    return 2037 -birthyear
}
const age2 = calcAge2(1991);

console.log(age1 , age2 );

// ! arrow function => An arrow function is a shorter and cleaner way to write a function in JavaScript using =>.

const functionName = (parameters) => {
    // code to execute
};


// example

// without writing return
const addSum = (a, b) =>  a+b;

console.log(addSum(4, 6)); // Output: 10

// with return 
const addNum = (a, b) => {
     let jod = a + b;
     return jod*a+b ;
};

console.log(addNum(4, 6)); // Output: 46

*/


// !function call other function

// function add(a, b) {
//     return a + b;
// }

// function calculateSum(x, y) {
//     return add(x, y); // calling another function
// }

// console.log(calculateSum(5, 3)); // Output: 8


//! array => An array in JavaScript is a special variable that can store multiple values in a single variable.

let fruits = ["Apple", "Banana", "Mango"];

console.log(fruits[0]); // Apple
console.log(fruits[2]); // Mango

// some method 
// push => add at last 
fruits.push("Guava");
console.log(fruits);
// [ 'Apple', 'Banana', 'Mango', 'Guava' ]


//unshift => add element at first position 

fruits.unshift("Grapes");
console.log(fruits);
// [ 'Grapes', 'Apple', 'Banana', 'Mango', 'Guava' ]

// remove element 

// pop => remove last element 

fruits.pop() // return pop element 
console.log(fruits); //=> [ 'Grapes', 'Apple', 'Banana', 'Mango' ]
// shift => remove first element 

fruits.shift();  // return first element 
console.log(fruits); // => [ 'Apple', 'Banana', 'Mango' ]

// include => return true if element is present in the array 

console.log(fruits.includes('Banana')); // => true

/////////////////////////////////////////////////////////

// !object => An object in JavaScript is a collection of key–value pairs 
// used to store related data and functions.

let student = {
    firstname: "Aditya",
    age: 20,
    course: "BTech",
    isActive: true
};

console.log(student);  // => { name: 'Aditya', age: 20, course: 'BTech', isActive: true }

console.log(student.firstname) // => aditya  
console.log(student['first' + 'name']) // =>  aditya 

const interested = student.age ;
console.log(student[interested]) //=> 20;   

// to add key and value  in object 
student.location = 'India'; 
student['insta' ] = 'ansh@'

// this method => this refers to the object that is calling the method.

const user = { 
    name: 'rahul',
    age: 20,
    haveLicense: true,
    greet : function(){
        console.log(`hello ${this.name}`)
    },

    getSummary : function(){
console.log(`hey my name is ${this.name} i am ${this.age} year old and i ${this.haveLicense ? 'have' : 'dont have'} license `)
    }


};

user.greet(); // => hello rahul
user.getSummary(); // => hey my name is rahul i am 20 year old and i have license 
