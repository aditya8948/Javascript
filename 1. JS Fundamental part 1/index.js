// let js = "amazing";
//       if(js === "amazing")                    
//         alert("javaScript is fun!");
//       console.log(20+30);


// ! primitive datatype in javascript 


/*
Number => floating point number , age = 23;
String => sequence of character , firstName = "rahul"
Boolean => logical type that  can only be true or false 
undefined => variable that is not yet  defined 
NUll => empty value
symbol => unique value that cant be change 
bigInt => large integer than the nummber cant hold
*/
/*
let javaScriptIsFun = true;
console.log(javaScriptIsFun);

// typeof => use to check datatype

console.log(typeof true); => boolean 
console.log(typeof javaScriptIsFun); => boolean 
console.log(typeof 23);           => number  
console.log(typeof "hello");      => string

let year ;
console.log(year);      => undefined 
console.log(typeof year); => undefined
*/

// ! let ,const , var
/*
let => mutable ,we can change value further 
const => immutable , we cant change value after declaring
var => mutable but it is function scoped and let is blocked scoped
*/



// !string and template literal 
/*

const firstName = "shubham ";
const birthYear = 2001;
const job = "teacher " ;

// to concatinate

const john = "i am " + firstName + "and i am a "
+ job;
console.log(john);

// easier way to do it 
// using template literal

const johnNew = `i am ${firstName} and i am a ${job}`;
console.log(johnNew);

console.log(`
    this
    is multi 
    line code we can write 
    with the help template `);

*/

// ! type conversion and type coerion

// type conversion  syntax => datatype(value)
let inputYear = '1991';
console.log(typeof inputYear);  =>  string
let convert = Number(inputYear);
console.log(typeof convert);   => number

// type coerion=> js automatically convert dt acrd to need 

console.log('aditya' + 34); => aditya34
console.log(3 + 34 + '5');  =>375


// prompt is use to get any input

const numb = prompt("enter the number");

== (loose check ) 
=== (strict check )   => datatype will also be checked
!= (loose check )
!== (strict check)


// logical operator

const hasLicense = true;
let hasGoodVision = true ;

console.log(hasGoodVision && hasLicense)  => true 
 hasGoodVision = false  ;
console.log(hasGoodVision || hasLicense)  => false 

// !switch case 

const day = "monday";

switch(day){
    case 'monday' : // day  === 'monday
        console.log("busy");
        break;
    
    case 'tuesday' :
        console.log("go work");
        break;
    
    case 'wednesday':
    case 'thursday' :
        console.log("sleep");

    default :
        console.log("ghar ja");
        
}

// !ternary operator

const age = 23;
 
age > 18 ? console.log("ride bike ") : console.log("ride bicycle");

const drink = age > 18 ? 'wine ' : 'water ';

console.log(drink);  => wine 



