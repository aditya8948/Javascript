'use strict';
// basic of functionn 
/*

1-> function declaration => can be called before defintion , function add(a,b) {}
2-> functionn expression => stored in a variable,  nnot histed fully , const add = function (a,b) {}
3-> arrow function =. shorter syntax , no ownn thhis , no arguent , const add =  (a,b) => a+b;
4-> function callling other function => one function uses another function result 
    funcntion cut(x) {retur  x*2; }
    function cook (y) {return cut(y);}
5-> parameter and argument => parameter variable in function definition 
    argument actual  value passed 
default parameter  => if argument is undefined it is used 
6-> passing primmitive vs  object 
primitive => copied value  
object => reference copied 

7-> first  class function => function are treated like values , 
can be stored in variabble k, passed as argument , returned from function
8-> higher order function => a  function that takes a  function or return a function 

9-> function returning functions => 
    function greet(msg){
        return function(name){
            console.log(msg, name);
        };
    }





// default parameter 

const createBooking  = function(flightNum , numPassenger =20 , price = 1000  ){
 const booking = {
    flightNum,
    numPassenger,
    price
 };
 console.log(booking);
}
createBooking("LHW234");// o/p  =>  { flightNum: 'LHW234', numPassenger: 20, price: 1000 }

*/ 

// first class function =>(its is propertyof language) that means function are treated like normal values 
// can be stored in variable , passed as argument , returned from another function

// higher order function =>(pattern built using that property) function that works with other function
//  a function is g=higher order if it -> takes a function as input, or return a function 

// two normal function
const oneWord = function (str){
    return str.replace(/ /g, '').toLowerCase();
}
const upperFirstWord =function (str){
    const [first , ...others] = str.split(' ');
    return  [first.toUpperCase(), ...others].join(' ');
};

// higher order function 

const transformer = function (str , fn ){
    console.log(`orignal string ${str}`);
    console.log(`transformed string: ${fn(str)}`);

    console.log(`transformed by : ${fn.name}`);
}

transformer('javascript is the bbest ' ,upperFirstWord); 
// o/p  = >
// orignal string javascript is the bbest 
// transformed string: JAVASCRIPT is the bbest 
// transformed by : upperFirstWord

transformer('javascript is the best ' , oneWord);
// o/p => 
// orignal string javascript is the best 
// transformed string: javascriptisthebest
// transformed by : oneWord