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

const displayMovements = function (movements , sort = false ) {
  // Clear UI before re-rendering movements (avoids duplicates)
  containerMovements.innerHTML = '';

  // use sort button to sort the  transaction 
 
 const movs = sort ? movements.slice().sort((a,b)=>a-b):movements;


  //  Loop over each movement
  movs.forEach(function (mov, i) {
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
const displayCurrentBalance = function(acc){
  acc.balance = acc.movements.reduce(function(accu,curr){
  return accu+curr;
 },0)
 labelBalance.textContent = `${acc.balance}ERU`
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

// function which update ui

const updateUI = function(acc){
  // display movement 
   displayMovements(acc.movements);

    // display balance 
  displayCurrentBalance(acc);


    // display summary 
    displayTransactionSummary(acc);
}

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
   
    updateUI(currentAccount);
  }

});


// money transfer option

btnTransfer.addEventListener('click' , function(e){
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);

  // checking condition 
  if(amount >  0 &&  // amount must be greater than zero
    receiverAcc &&    // reciever account must be  exist 
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName // no self transfer 
   ){
    console.log(amount , receiverAcc);
  // doing the transfer 
   currentAccount.movements.push(-amount);
   receiverAcc.movements.push(amount);

 // update ui 
   updateUI(currentAccount);
   } 

});

// approve  loan => condition if any deposit is 10 % of loan request 

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if(amount > 0 &&
    currentAccount.movements.some(val => val >= amount * 1.0)
  ){
    //add amount
    currentAccount.movements.push(amount);
    
    //update UI
    updateUI(currentAccount);
  }
})

// close and account 
  
// findIndex => work same as find but it return the index of first  truthy value 

btnClose.addEventListener('click' ,function(e){
  e.preventDefault();
  if(currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ){
    
  const index = accounts.findIndex(acc => acc.userName === currentAccount.userName);
    
    // delete account 

    accounts.splice(index,1);

    // hide UI
    containerApp.style.opacity = 0;
  }
})

// add button for  sort the movement 
let sorted = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements , !sorted);
  sorted = !sorted;
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
/*
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






// ! find, findIndex , findLast , findLastIndex method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//find => return the first truthy value 

// const value =  movements.find(val => val<0);  //o/p => -400

//findindex => return index of first truthy value 
// const value =  movements.findIndex(val => val<0);  //o/p => 2

// findLast => return last truthy value
//  const value =  movements.findLast(val => val<0);  //o/p => -130

 // findLastIndex => return last truthy  value index
//  const value =  movements.findLastIndex(val => val<0);  //o/p => 5


//! some and every method 

//some => return boolean value if condition satisfy one time

const deposit = movements.some(val => val > 0);
console.log(deposit); // true

//every => return boolean value if condition satisfy everytime 

const onlyDeposit = movements.every(val => val > 0);
console.log(onlyDeposit); // false 


// !flat and flatmap method 
//flat => flatterns nested array into single array , remove one level nesting default 

const arr = [1,2,[3,4],5,[6,7]]  //o/p => [1, 2, 3, 4, 5, 6, 7]
const flatarr = arr.flat();
console.log(flatarr)

const arr2 = [1,2,[3,4],5,[6,7,[8,9]]]
const flatArr2 = arr2.flat(2);
console.log(flatArr2)  // o/p => [1, 2, 3, 4, 5, 6, 7, 8, 9]


// const overallBalance = accounts
//                         .map(val => val.movements)
//                         .flat()
//                         .reduce((accu,cur) => accu+cur ,0);
                  
// console.log(overallBalance);

// flatmap => combination of  flat and map method 

const overallBalance = accounts
                        .flatMap(val => val.movements)
                        .reduce((accu,cur) => accu+cur ,0);
                  
console.log(overallBalance);
*/

//////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the breed levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no breed repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

/*
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];


//1 
const huskeyWeight = breeds.find(name => name.breed === 'Husky').averageWeight;
console.log(huskeyWeight)

//2
const dogBothVariable = breeds.find(dog => dog.activities.includes('running') &&
                                           dog.activities.includes('fetch')).breed;
console.log(dogBothVariable)

//3
const allActivities = breeds.flatMap(breed => breed.activities)
console.log(allActivities)

// 4

const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

//5
const swimmingAdjacent = [
  ...new Set(
    breeds
          .filter(breed => breed.activities.includes('swimming'))
          .flatMap(breed => breed.activities)
          .filter(activity => activity !== 'swimming')
  )
]
console.log(swimmingAdjacent)

// 6
console.log(breeds.every(weight => weight.averageWeight > 10));

//7
console.log(breeds.some(active => active.activities.length >= 3));

// bonus 

const heaviestWeight = (breeds.filter(activity => activity.activities.includes('fetch'))
                             .map(weight => weight.averageWeight))
console.log(Math.max(...heaviestWeight));
                            
*/ 

//--------------------------------------------------

//! sorting 

// string 
const  owner = ['jonas' , 'zach','adam','martha'];
console.log(owner.sort()); //o/p  => ['adam', 'jonas', 'martha', 'zach'] 

//sort() => mutate the orignal array 

// nummber 

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// sort function number ko string ke trh treet krke sort krta hai 

console.log(movements.sort()) // o/p =>[-130, -400, -650, 1300, 200, 3000, 450, 70]

// to sort we have to write  a call back fuction 

// return < 0 (any negative value ) to keep the order
// return > 0 (any positive value ) to change the order 

// increasing order 
// movements.sort((a , b) => {
//   if(a < b) return -1;   // here a-b will always negative we can return that also
//   if(a > b) return 1;    // and here  it will always positive 
// });

movements.sort((a ,b) => a-b); 
console.log(movements)   // o/p=> [-650, -400, -130, 70, 200, 450, 1300, 3000]

// decreasing order 

movements.sort((a ,b) => b - a);
console.log(movements); //o/p => [3000, 1300, 450, 200, 70, -130, -400, -650]