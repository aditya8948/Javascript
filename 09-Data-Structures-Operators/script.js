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

  

  // > for of loop => for...of is used to loop over values of an iterable.
  // Iterables include: array  , string , sets maps


const arr = [10, 20, 30];

for (const value of arr) {
  console.log(value);     //  o/p => 10,20,30
}  


// getting  index with (for .. of )
 for( const [index , value] of arr.entries()){
  console.log(index, value ); 
                                    // o/p => 0 10
                                    //        1 20
                                    //        2 30
 }

 // for .. of with string 

 for (const ch of "hello"){
  console.log(ch);               //o/p=> h e l l o
 }


 // for ... of with set 

 const set = new Set([1,2,3]);
 for(const  val of set ){  
  console.log(val);             // o/p => 1 2 3
 }


 // for... of with map 

const map = new Map([
  ["name" , "a"],
  ["age", 22]
]);

for(const[key,value] of map ){
  console.log(key,value);           // o/p => name a 
                                    //        age 22 
}




// ! enhance object literal 

const  subjectMarks = {
      hindi: 20,
      english: 18,
      math:9
    };

 const obj1 ={
    name: 'sunder',
    class: 3,
   // if  we want to add subjectamarks in obj1 
  //  subjectMarks: subjectMarks  
   // also we can write it like 
   subjectMarks,
  };
  console.log(obj1);

  

  //> optionnal chaining => optional chaining safely acces properties or method withoud throwing an
  // erroe if something is null or undefined 
  // instead of crshing it return undefined 
  // Optional chaining allows safe access to nested object properties and methods 
  // without throwing errors when values are null or undefined

  const user = {};
  console.log(user.address.city) // typeerror

  because user.address is undefined , you cant  access .city on undefined

  // old method to check 
  if (user &&  user.address && user.address.city){

    console.log(user.address.city);
  }

  // optional chaining solutionn 
   consolelog(user.address?.city)   // undefined 

   // how it work, 
   obj?.prop 
   means => if obj exist , get prop . otherwise return undefined 
   js stops immediately if it find null or undefined 

   // > optionnal chaining with method 

   user.sayHi?.();
   if sayHi exist => called 
   if not => nothing happens (return undefined )

   // > optional chaining with array 
   const user = [];
   ContentVisibilityAutoStateChangeEvent.log(user[0]?.name);

   // combine with nullish coalescinng (??)
   const coty = user.address?.city ?? "not available ";
   ?. => safe access
   ?? => default only for null / undefinned 
  //  ------------------------------------------------------------------------


  // !object looping => object are not interable like array ,you must loop over keys / values / entries 
//Objects are looped by iterating over their keys, values, 
// or entries using for...in or Object.keys/values/entries.
  
  const user ={
    name: "a",
    age: 22, 
    city: "delhi",
    user1: {
      name: "b",
      age: 24
    }
  };
// for..in is a classy way to  do that 
  for (const key in user ){
    // console.log(key , user[key]);     
                                                // o/p  => name a
                                                //   age 22
                                                //   city delhi 
                                                //   user1 { name: 'b', age: 24 }

  }

  // object.keys()
  Object.keys(user).forEach(key => {
    // console.log(key , user[key]);      // same o/p
  }) 


  // object.values()
  Object.values(user).forEach(value => {
    console.log(value);
// o/p => only values get printed 
// a
// 22
// delhi
// { name: 'b', age: 24 }
  });


  // object.entries() (best )
  for (const [key, value] of Object.entries(user)){
    console.log(key ,value);
  }



  //-------------------------------------------------------------------------

  // !! set => it is a collection of unique values (no duplicates Ever)
  // why we need it => 
    // > only unique value 
    // > fast lookup

  // create set => 
     const mySet = new Set();

  
  const s = new Set([1,2,2,3])
  console.log(s);     // o/p => Set(3) { 1, 2, 3 }

  console.log(new Set("jonas")); // o/p => Set(5) { 'j', 'o', 'n', 'a', 's' }

// basic operations
// > add 
  mySet.add(5);
  mySet.add(6);
  mySet.add(7);

// console.log(mySet);    // o/p  => et(1) { 5 , 5, ,7 }

// > check existence (has )
// console.log(mySet.has(5));    // o/p => true

// > delete => 
  // console.log(mySet.delete(6));  // o/p  => true 
  // console.log(mySet);            // o/p  => Set(2) { 5, 7 }

// > clear all 
//  mySet.clear();
 console.log(mySet);   //  {}

 // check size
 console.log(mySet.size);  // o/p => 3


 // > looping over set 

 // for...of (most common)
 for(const val of mySet ){
  console.log(val);
 }


 // convert set <=> array 

 //  array to set  (remove duplicates )

 const arr = [1,2,3,4,1,2,1,3];
 const unique = new Set(arr);      
 console.log(unique);              // o/p=  { 1, 2, 3, 4 }

//  set  => array 
const uniqueArr = [...unique]; 
console.log(uniqueArr);       // o/p => [ 1, 2, 3, 4 ] 


// some new opration on set 

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

// > intersection (return common item of set )
const commonFood = new Set(italianFoods.intersection(mexicanFoods));
console.log([...commonFood]); // o/p => [ 'tomatoes', 'garlic' ]

// >  union (return all set item , dublicates only one time 

const allItem = italianFoods.union(mexicanFoods);
console.log([...allItem]);  // o/p => ['pasta','gnocchi','tomatoes','olive oil','garlic','basil','tortillas','beans','rice','avocado']

// > difference (return all element of 1st set which are not present in 2nd set )
 
const uniqueItalianFood = italianFoods.difference(mexicanFoods);
console.log([...uniqueItalianFood]);    // o/p -> [ 'pasta', 'gnocchi', 'olive oil', 'basil' ]


const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);
console.log([...uniqueMexicanFoods]);    // o/p -> [ 'tortillas', 'beans', 'rice', 'avocado' ]

//> symmetricDifference (return non common item of both )

const uniqueItalianMexicanFoods = italianFoods.symmetricDifference(mexicanFoods);
console.log([...uniqueItalianMexicanFoods]); // o/p -> ['pasta', 'gnocchi', 'olive oil', 'bbasil', 'tortillas', 'beans', 'rice', 'avacado']




// ----------------------------------------------------------------------------
// !! map => it is a collection if key value  pair , like an objet but safer in many cases.\
//      Map = dynamic key–value store, Object = structured data
// A Map is a built-in JavaScript object that stores key–value
//  pairs with keys of any type and preserves insertion order.
// problem with object => 
  // - keys are converted to string 
  // - prototype pollution 
  // - order quirks 
  // and map fix all thesse 

  const userMap = new Map([
    ["name" , "a"],
    ["age" ,22]
  ]);

//basic operation 

// -> set value :
userMap.set("city" ,["delhi" , "up"]);
console.log(userMap);  // o/p => Map(3) { 'name' => 'a', 'age' => 22, 'city' => [ 'delhi', 'up' ] }


// -> get value 
console.log(userMap.get("city"));     // o/p => [ 'delhi', 'up' ]


// check key 
console.log(userMap.has("city"));   // o/p => true 

// delete key 

userMap.delete("city");

// check size 
console.log(userMap.size);     // return total no. of keys =>2 


// => looping over map

for(const [key,value] of userMap){
  console.log(key,value);            // o/p=> name a 
}                                    //       age 22 


// to print key/ value / entries 

console.log(userMap.keys());       //  { 'name', 'age' }
console.log(userMap.values());     //   { 'a', 22 }
console.log(userMap.entries());   //   { [ 'name', 'a' ], [ 'age', 22 ] }


// => convert object <-> map

//1 object -> map
const map = new Map(Object.entries(obj));

//2 map -> object 
const obj =  Object.fromEntries(map); 



// little quiz
 const question =  new Map ([
  ['question' , 'which is yourr favoriye language'],
  [1, 'c'],
  [2, 'java'],
  [3, 'javaScript'],
  ['correct' , 3],
  [true, 'correct'],
  [false, 'try again']
 ]);
//  console.log(question);

for(const [key , values] of question){
  if(typeof key === 'number') 
    console.log(`Answer ${key}: ${values}`);
}





// -----------------------------------------------------------------------------------------

// !! string => it is the  immutable sequence oof  character, these are stored as primitive values , pass ed by value , operration create new string ,
// trings in JavaScript are immutable primitive values, and most string operations 
//     return new strings rather than modifying the original.

const str =  'hello ';

// important properties 

// -> length 
console.log(str.length);

// case conversion 
console.log(str.toUpperCase());     // o/p => HELLO
console.log(str.toLowerCase());      // o/p  => hello


//->  slicinng (support -ve value also)

console.log(str.slice(2));       // llo 
console.log(str.slice(2,-1))    // llo
console.log(str.slice(0,3))     //hel
console.log(str.slice(1))       //ello

// -> search 

console.log(str.includes("he"));    // true 
console.log(str.indexOf("l"));      // 2

// -> split and join

const word = "hello world".split(" ");    // split the string on the basis  of  given argument 
console.log(word);    // o/p  => [ 'hello', 'world' ]

const name = 'aditya pandey ';

const [firstName , lastName] = name.split(' ');
console.log(firstName,lastName);

const capitalizename = function(item){
  const name = item.split(" ");
  const userName = [];
  for(const ch of name ){
    if(ch === "") continue;   // skip extra space 
    userName.push(ch[0].toUpperCase() + ch.slice(1));
  }
  console.log(userName.join(' '));
}

capitalizename("jonas schemedtmann");
capitalizename("if  you are looking for any job you are at right plavce ");

// strings + loops 
// for....of (best  way )

for(const ch of str){
  console.log(ch);
}




// most used string patter  

//1 -> frequency counting

const freq ={};

for(const ch of str){
  freq[ch] = (freq[ch] || 0) + 1;
}
console.log(freq);     // { h: 1, e: 1, l: 2, o: 1, ' ': 1 }

// 2-> reverse string 

console.log(str.split("").reverse().join(""));   //  olleh


// 3-> string template literal 

const name = "a";
console.log(`hello ${name}`);


// fix capitalization in name

const passengerName  = "AdiTyA "   // Aditya 
const passengerLower = passengerName.toLowerCase();
const correctName = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(correctName);   // Aditya 


// -> replace 


const announcement ='all passenger go to boarding door 23, Boarding door 23!';

console.log(announcement.replace('door' , 'gate')) // it only replace first occurance

const comment = 'shubham has 32 mark in math but shubham fails in hindi '

console.log(comment.replaceAll('shubham','boy'));  // o/p => boy has 32 mark in math but boy fails in hindi 


// -> boolean 


const plane = 'Airbbus A320neo';
console.log(plane.includes("A320"));
console.log(plane.includes('boeing'));
console.log(plane.startsWith('Air'));

if(plane.startsWith('Air') && plane.endsWith('neo')){
  console.log("part of new airbus family");
}

// practice question

const checkBaggage = function(items){
  const baggage = items.toLowerCase();
  if(baggage.includes('knife') || baggage.includes('gun')){
    console.log('you are not allowed to board ');
  }
  else console.log('welcome');
}

checkBaggage('i have  a laptop  and some food ');  // welcome 
checkBaggage("i have gun for  my safeety ");      // you are not allowed 
checkBaggage('i have knife to cut the food ');  // you are not allowed 

*/


// -> padding 
const message = 'hi aditya';
console.log(message.padStart(20,'+'));  // o/p = +++++++++++hi aditya
console.log(message.padEnd(20,'+'));     // o/p = hi aditya+++++++++++

const maskCreditCard = function(number) {
  const str  = number + '';
  const  last  = str.slice(-4);
  return last.padStart(str.length,'*');
};

console.log(maskCreditCard(22221457));
console.log(maskCreditCard(5486972));