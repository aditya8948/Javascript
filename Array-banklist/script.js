'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



const displayMovements = function(movements) {
  // Clear UI before re-rendering movements (avoids duplicates)
  containerMovements.innerHTML = '';
  //  Loop over each movement
  movements.forEach(function(mov,i){
    // Decide if money is coming in or going out
  const type = mov>0 ? 'deposit': 'withdrawal';
  //  Create HTML structure for a songle movement
  const html = `
   <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
      <div class="movements__value">${mov}</div>
        </div>
  `;
  //Insert the movement into the container (newest on top)
    containerMovements.insertAdjacentHTML('afterbegin' ,html);

})
}

displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

/*

//! some array method 

//-> slice() => copy part of an array (does mutate orignal array )
              // take element from srt to end-1 and return new arr
let arr = ['a' ,'b', 'c', 'd', 'e'];

// console.log(arr.slice(2));  //o/p => [ 'c', 'd', 'e' ]
// console.log(arr.slice(1,4));  //o/p => [ 'b', 'c', 'd' ]
// console.log(arr.slice(-1));  // o/p => ['e']
// console.log(arr.slice(-3,-2)) // o/p => ['c']


//-> splice => remove /add element (mutate  the orignal array )
// syntax => arr.splice(strt index , deleteCount)

// console.log(arr.splice(3)); // o/p  => ['d' , 'e']
// console.log(arr);             // o/p => [ 'a', 'b', 'c' ]


// console.log(arr.splice(2,2));  //o/p=> [ 'c', 'd' ]
// console.log(arr);             // o/p => [ 'a', 'b', 'e' ]

// add element 
// arr.splice(2,2,'z');
// console.log(arr);

//-> reverse() => reverse array in place (mutate orignal array )

let arr2 =['l','k','j','i','f'];
// arr2.reverse();
// console.log(arr2);  //o/p => [ 'f', 'i', 'j', 'k', 'l' ]

//safe version

const rev = [...arr2].reverse();
console.log(rev);         // o/p =>['f','i','j','k','l']


//-> join() => glue elememt into string , does not change orignal array 

console.log(arr.join("-"));   //o/p  => a-b-c-d-e



//-> at method => use to point value of array 

const arr =[23,44,56];
console.log(arr[0]);   //o/p=> 23
console.log(arr.at(0)); //o/p=> 23 

//getting last index 
console.log(arr[arr.length-1]);   //o/p=> 56
console.log(arr.at(-1));         //o/p=> 56

console.log("aditya".at(3)) //o/p => 't'



// -------------------------------------------------------------------------------

// !for each and for of  loop

// for of 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for(const [i , value] of movements.entries() ){
  if(value < 0) console.log(`movement ${i+1}: you withdraw money${value} `);
  else console.log(`movement ${i+1}: you deposit money ${Math.abs(value)} `);
}

//
// o/p =>  
  // movement 1: you deposit money 200 
// movement 2: you deposit money 450 
// movement 3: you withdraw money-400 
// movement 4: you deposit money 3000 
// movement 5: you withdraw money-650 
// movement 6: you withdraw money-130 
// movement 7: you deposit money 70 
// movement 8: you deposit money 1300 

// for each => use callback function ,// cant use break and continue statement in for each loop

movements.forEach(function(value,index,arr){
   if(value < 0) console.log(`movement ${index+1}: you withdraw money${value} `);
  else console.log(`movement ${index+1}: you deposit money ${Math.abs(value)} `);
});
//o/p => 
// movement 1: you deposit money 200 
// movement 2: you deposit money 450 
// movement 3: you withdraw money-400 
// movement 4: you deposit money 3000 
// movement 5: you withdraw money-650 
// movement 6: you withdraw money-130 
// movement 7: you deposit money 70 
// movement 8: you deposit money 1300 

*/
// for each on map 

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value,key,map){
  console.log(`${key} : ${value}`)
})
//o/p=> 
// USD : United States dollar
// EUR : Euro
// GBP : Pound sterling

// for each on set

const currency = new Set(['USD', 'GBP' ,'USD','EUR']);
currency.forEach(function (value , _, set){
  console.log(value);
})
//o/p=>
//  USD
//  GBP
//  EUR
