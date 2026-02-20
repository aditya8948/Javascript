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

const displayMovements = function (movements) {
  // Clear UI before re-rendering movements (avoids duplicates)
  containerMovements.innerHTML = '';
  //  Loop over each movement
  movements.forEach(function (mov, i) {
    // Decide if money is coming in or going out
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    //  Create HTML structure for a songle movement
    const html = `
   <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}</div>
        </div>
  `;
    //Insert the movement into the container (newest on top)
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};


// show the current balance 
const displayCurrentBalance = function(movement){
 const balance = movement.reduce(function(accu,curr){
  return accu+curr;
 },0)
 labelBalance.textContent = `${balance} ERU`
}

// displayCurrentBalance(account1.movements);

// show balance summary 
const displayTransactionSummary = function(acc){

const income = acc.movements.filter(val => val > 0)
                        .reduce((accu,cur) => accu+cur ,0);
labelSumIn.textContent = `${income}ERU`

const withdraw = acc.movements.filter(val => val < 0).
                  reduce((accu,val) => accu+val ,0);
labelSumOut.textContent = `${Math.abs(withdraw)}ERU`;

const interest = acc.movements.filter(val => val > 0)
                         .map(deposit => deposit*acc.interest/100)
                         .reduce((accu, interest) => accu+acc.interestRate,0);
labelSumInterest.textContent = `${interest}ERU`
}
// displayTransactionSummary(account1.movements);


// add username property to every account object (small letter of first word of name )
// example jonas schemandman => js

const createUserName = function(accs){
  accs.forEach(function(user){
    user.userName = user.owner
                     .toLowerCase()
                     .split(' ')
                     .map(name => name[0])
                     .join('');
  })
}
createUserName(accounts);
// console.log(accounts);


// event handler 
let currentAccount ;
btnLogin.addEventListener('click' , function(e){
  // prevent form from submitting 
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value );

  if(currentAccount?.pin === Number(inputLoginPin.value)){

    // display ui and display  message 
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}` ;
    containerApp.style.opacity = 1;

    // clear input field 
    //(for after login user and pin get invisible )
    inputLoginUsername.value = inputLoginPin.value = ' ';
    //cursor is blinking on pin input section
    inputLoginPin.blur();
    // display movement 

    displayMovements(currentAccount.movements);

    // display balance 

    displayCurrentBalance(currentAccount.movements);


    // display summary 
    displayTransactionSummary(currentAccount);

  }

})


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


// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each).
 For now, they are just interested in knowing whether a dog is an adult or a puppy.
  A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, 
not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]



const juliaDog =[3,5,2,12,7];
const kateDog = [4,1,15,8,3];

const [...juliaCorrectedDog] = juliaDog;

juliaCorrectedDog.splice(0,1);
juliaCorrectedDog.splice(-2);

console.log(juliaCorrectedDog)

const dogs = [...juliaCorrectedDog,...kateDog];
console.log(dogs);

  dogs.forEach(function(age ,i){
    if(age < 3)
    console.log(`Dog number ${i+1} is still a puppy `);
    else 
      console.log(`Dog number ${i+1} is an adult `);
  });



// ---------------------------------------------------------------------
// arrray data transformation methods
// ! map , filter ,reduce method

// map => map return new array containing the result of applying an operation on all orignal array element

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

const usdCurrency = movements.map(function (mov) {
  return mov * eurToUsd;
});
console.log(usdCurrency);
//o/p =>
// [
//   220.00000000000003,
//   495.00000000000006,
//   -440.00000000000006,
//   3300.0000000000005,
//   -715.0000000000001,
//   -143,
//   77,
//   1430.0000000000002
// ]

const movementDescription = movements.map((mov, i) => {
  return `movement ${i + 1} : you ${mov > 0 ? 'deposit' : 'withdraw'} ${mov} money`;
});
console.log(movementDescription);
//o/p  =>
// [
//   'movement 1 : you deposit 200 money',
//   'movement 2 : you deposit 450 money',
//   'movement 3 : you withdraw -400 money',
//   'movement 4 : you deposit 3000 money',
//   'movement 5 : you withdraw -650 money',
//   'movement 6 : you withdraw -130 money',
//   'movement 7 : you deposit 70 money',
//   'movement 8 : you deposit 1300 money'
// ]


// !filter => return new array containing the array element that passes a specified test condition

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(mov => mov > 0);
// const  withdraw = movements.filter(mov => mov < 0);
// console.log(deposits,withdraw);


//o/p= [200,450.3000,70,1300] [-400,-650,-13]

// ! reduce boild('reduce') all the array element down to one single value
// syntax => arrayName.reduce(function(accumulator, value , index , array){})
// accumulator => snowball
const total = movements.reduce(function(acc,curr){
  return acc+curr  
},0 ); //intial value of accumulator
console.log(total);


const maximum = movements.reduce((accu,curr) => accu >curr ? accu : curr , 0
)
console.log(maximum);  // o/p => 3000

*/


///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

*/

const calcAverageHumanAge = function(ages){
  // map to calculate human age 
  const humanAge = ages.map(function(age){
    return age <= 2 ? 2*age : 16+ age * 4 ;
  })
  console.log(humanAge);
  // filter method use to filter adultdogs 
  const adultAge = humanAge.filter(age => age >=18);
  console.log(adultAge)
  // reduce method use to find the average  
  const totalAverage = adultAge.reduce((accu,curr) => accu+curr , 0) / adultAge.length;
  
  return totalAverage
}

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));



//! find method => return the first value which satisfy the condition

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdraw = movements.find(val => val<0);
console.log(firstWithdraw); //o/p => -400

const account = accounts.find(name => name.owner === 'Jessica Davis');
console.log(account);  // give information about jessica 
