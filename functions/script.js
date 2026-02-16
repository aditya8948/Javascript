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

transformer('javascript is the best ' ,upperFirstWord); 
// o/p  = >
// orignal string javascript is the bbest 
// transformed string: JAVASCRIPT is the bbest 
// transformed by : upperFirstWord

transformer('javascript is the best ' , oneWord);
// o/p => 
// orignal string javascript is the best 
// transformed string: javascriptisthebest
// transformed by : oneWord


// !functionr returning function
const greet = function(greeting){
    return function(name){
        console.log(`${greeting} ${name}`);
    }
}

const greeter = greet('hey'); //now the returning function get store in greeter 
greeter('abhay')      // we are calling greeter function which is return by the greeet function
greeter('alok');      // o/p => hey alok

*/

// ! call and apply method (using this keyword )


const delhi = {
    airline: "Delhi",
    iatacode: 'DL',
    booking: [],
    book(flightName , name){
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iatacode}${flightName}`);
        this.booking.push({flight : `${this.iatacode}${flightName}` , name })   // push the  detail in booking arrray 
    }
}

delhi.book(201 , 'aman');   // o/p => aman booked a seat on Delhi flight DL201
console.log(delhi);   

const Mumbai = {
    airline: "mumbai",
    iatacode: 'MUB',
    booking: []
}

const book = delhi.book;  // now book is same function in book object , but the problem is this is not 
                          // is undefined here because book is a regular function
                         // to explicitly provide the  this we use call and apply method 

                
// this will not work because this is undefined 
// book(delhi, 234 , 'ashish');


// syntax => functionName.call(object this has to define , argument )
book.call(delhi, 234 ,'ashish');
console.log(delhi);   

// o/p =>  //ashish booked a seat on Delhi flight DL234
// {
//   airline: 'Delhi',
//   iatacode: 'DL',
//   booking: [
//     { flight: 'DL201', name: 'aman' },
//     { flight: 'DL234', name: 'ashish' }
//   ],
//   book: [Function: book]
// }

// we can call this funnction for other object  also 

book.call(Mumbai, 456 ,'sunil');
console.log(Mumbai);
//o/p => sunil booked a seat on mumbai flight MUB456
// {
//   airline: 'mumbai',
//   iatacode: 'MUB',
//   booking: [ { flight: 'MUB456', name: 'sunil' } ]
// }


// !apply method => it also do the same work but difference is it  does not recieve list of argument 
//                     after this keyword instead it recieve array 

const flightData = [583 , 'gaurav'];
book.apply(Mumbai,flightData);   // gaurav booked a seat on mumbai flight MUB583
// as it is not much used we can also do  it by call

book.call(Mumbai,...flightData); // o/p => gaurav booked a seat on mumbai flight MUB583


// ! bind => create a new function with this permanently fixed to a given object 

const lucknow ={
    airline: 'lucknow',
    iatacode: 'LK',
    booking: []
}
const bookMUB = book.bind(Mumbai); // now bookMUB is a new function which has this with point the mumbai object 
bookMUB(34 ,"nehre"); // o/p => nehre booked a seat on mumbai flight MUB34

// we can also set argument example 

const bookLk = book.bind(lucknow , 2334); // here we give flightnum 
bookLk('anurag '); // o/p  => anurag  booked a seat on lucknow flight LK2334

// it is useful in event listner 
// partial application

// const addTax = (rate , value ) => value +value * rate ;
// console.log(addTax(.1 ,200));

// const addVAT = addTax.addTax.bind(null , 0.23) // now addVat is new fuction with argument rate 

// returning function 
const addTax = function (rate){
        return function(value){
            return value + value * rate ;
        }
}

const addVAT2 = addTax(.23);
console.log(addVAT2(100)); // o/p => 123


