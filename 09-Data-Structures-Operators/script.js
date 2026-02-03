'use strict';
/*
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// ---------------------------------------------------------------------------------------------------------------------------------------


// !! array destructuring => unpacking values of srray into variables 
      -Take values out of the array, left to right, and put them into variables

// example 
 const arr = [10, 20, 30];
 const[a,b,c] = arr;
 console.log(a , b , c);   // o/p => 10 , 20 , 30

 // we want to  skip the  value 

 const[d , , e] = arr;  // second  value will get skip 
 console.log(d ,e);     // o/p => 10 , 30 

 // we can assign default value also incase if value is  not present in the array it will automatically assign to it 

const[f=15 , g] = [ ,3 ];
console.log(f,g);      // o/p =>  15, 3;

// swap varriable 
[f,g] = [g,f] 
console.log(f,g) // o/p => 3, 15


// destructuring with function 

function getCoordinates() {
  return [10, 20];
}

const [x, y] = getCoordinates();


// nested array destructuring

const ar = [1, [2, 3]];

const [w, [v, z]] = ar;


// destructuring and rest operator 

const a = [1,2,3,4];
const [first , secon ,...third ] = [1,2,3,4];

console.log(first , secon , third) ;   // o/p => 1 2 [ 3, 4 ]



// --------------------------------------------------------------------------------------------------------------------------------------------------

// object destructuring => extracting properties from object to a variable 
//  here , property matter very much , it should be right 
const user   = {
  name: "aditya",
  age: 23
};


// instead of 
// const  FirstName = user.name ;
// const Age = user.age;
// console.log(FirstName, Age);

// we  can do 

const{name , age} = user ;
console.log(name,age);

// renaming variable & default value 
const{name : firstName = "no name " , age : myAge = 18 , duty: job ="unemployed"} = user ;
console.log(firstName , myAge , job );

// nested destructuring 
const user1 = {
  name: "A",
  address: {
    city: "Delhi",
    pin: 110001
  }
};

const {
  address: { city, pin }
} = user1 ;


console.log(city , pin);


// object destructuring in function 

function user3({name, address:{city,pin}}){
  console.log(name , city , pin);
}
user3(user1);

// rest  operator with object 

const{ name:firstname , ...rest}  = user1;
console.log( firstname , rest) ;
// o/p => firstname will contain name and  rest of  the properties are contained by rest ;



//---------------------------------------------------------------------------------------------------------------------------------

// spread operator(...) => it expand the interable(array , string , maps ) not object individual element 

// > spread with array 
    // - shallow copy 
    const arr1 = [1, 2, 3];
    const arr2 = [...arr1];
    
    // merge array 
    const a = [1,2,3];
    const b = [4,5,6];
    // const  c = [...a, ...b];
   // console.log(c);           // o/p => [ 1, 2, 3, 4, 5, 6 ]

    // add element 
    const c = [4,...a,...b,9,10]
    console.log(c);   // [4,1,2,3,4,5,6,9,10]  

    

// we can also pass this  in function as argument
     const a = [1 ,2,3 ,4]
    function add(a, b, c){
      console.log(`total sum = ${a+b+c}`);
      return ;
    }

    add(...a);
 
// . spread with object 
  // shallow copy - New outer object , nested objects → reference copied
  const user1 = {
    name: 'ansh',
    age: 22,
     favoriteFood: {
      sweet: 'rasmalai',
      mainCourse: 'kadhaiPanner'
    }
  }
 const user2 = {...user1};
 console.log(user2);

 user2.age = 24;
 user2.favoriteFood.sweet ='gulab jamun';

 console.log(user1); 
 console.log(user2);    // only nested  object things change in both as there references are copied 

 // merge  object 
  const obj1 ={
    name: 'sunder',
    class: 3
  }
  const obj2 = {
    totalMark: 300,
    scored: 280,
  }
  const student = {...obj1 , ...obj2};
  console.log(student);    // 0/p => { name: 'sunder', class: 3, totalMark: 300, scored: 280 }

  

// - spread with string 

const name = "shubham";
const char = [...name];
console.log(...name);   // o/p => s h u b h a m
console.log('a', ...name); // o/p => a s h u b h a m
console.log(char);    // o/p =>  ['s', 'h', 'u','b', 'h', 'a',]


// spread vs rest => as they use same syntax but meaning depend upon position ,Spread breaks things apart. Rest gathers them together.
//  spread => expand individual 
 const arr = [...nums];
// rest  =>  collect 
  function sum(...nums) {
  console.log(nums);
}
  

// using rest and spread operator 
 // 1> destructuring

// rest  in left  side 
  const [a, b, ...others] = [1,2,3,4,5];
  console.log(a,b,others);               // 0/p => 1 2 [ 3, 4, 5 ]

// object 
 const obj1 ={
    name: 'sunder',
    class: 3,
    subjectMarks: {
      hindi: 20,
      english: 18,
      math:9
    }
  }
  const {ob,...other} = obj1.subjectMarks;
  console.log(ob,other);      // op => undefined { hindi: 20, english: 18, math: 9 }

// functions
const add = function(...number){
  let sum = 0;
  for(let i = 0 ; i < number.length ; i++) sum+=number[i];
  console.log(sum);
};
add(2,3);         // o/p=> 5
add(2,6,5,3);     // o/p=>16
add(1,8,47,2,3);  // o/p=>61

const x =[23,5,7];
add(...x);             //o/p => 35


// -----------------------------------------------------------------------

// short circuiting => means js stops evaluation as soon as the result is decided

//1=> OR operator => || return the first truthy value , or the last value if none are truthy 
console.log(0 || "hello") //o/p=> hello
// practical use 
const username = " "|| "guest";   // username = guest , as first value is false 


//2=> return first falsy value or the last value if all are truthy
console.log(10 && "hello") // o/p => hello
console.log( 0 && "hello") // o/p => 0

// practical use 
// isLoggedIn && showDashboard()  // if isLoggedIn is false => function is never called 

// nullish : only null and undefined are falsy for this , (0 or "") are also true

let guestname = 0 ?? 10;
console.log(guestname);  // o/p => 0

guestname = undefined ?? "aman";
console.log(guestname);   // o/p => aman 


//

const rest1 ={
  name: "gaurav",
  numGuest: 20
 }
 const rest2 ={
  name: "pizza cola",
  owner: "abhishek"
 }

 rest1.numGuest = rest1.numGuest || 10 
 rest2.numGuest = rest2.numGuest || 10 
 // or we can write this lke (or assignment operator )
  rest1.numguest ||= 10;
  rest2.numGuest ||= 10;

  // but it take 0 as falsy value so instead of this we can use nullish assignment operator
   rest1.numguest ??= 10;
   rest2.numGuest ??= 10;

  // console.log(rest1.numGuest, rest2.numGuest)    o/p => 20 10

  */