'use strict';



// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

// SYNCHRONOUS  JAVASCRIPT => code runs line by line , one task at a time

// console.log('Test start');
// console.log('Test end');

//output:
// Test start
// Test end

// js waits for each task to finish before starting new one 
// beacuse js  is single threaded language
// one tread means that js has one call stack and one memory heap
// most code is synchronous 


//! ASYNCHRONOUS JAVASCRIPT => code runs in non blocking way , one task can start before previous one finishes
// some  task  take time like network request , timer , loading images ,API CALL
// if js waited for them , the whole website  would freeze , so js uses asynchronous behaviour 

// exampple 

console.log("start");

setTimeout(() =>{
    console.log("timer finished ");
}, 2000);

console.log("end");

//output:
// start
// end
// timer finished

// why? => beacuse the timer runs in the backgroud , and js continnues executing the  rest of the  code 
// asynchronous code is non blocking
// execution dosent wait for  an asuynchronous task to finish its work 

//! AJAX => Asynchronous JavaScript and XML
// it allow us  to communicate with remote web server in an asynchronous way . with AJAX call , we can request data from web server dynamically.
// js can request data from a server without reloading the page 

// !API `=> Application Programming Interface
// piece of  software that   can used  by another piece of software , in order to applicationn talk to each other 
// there are many type in web development 
// DOM API , Geolocation API ,fetch API ,
// online api =>application runnig on aserver , that recieve request for data , and sends data back to response 

//  there  are an api for everything in web development
// weather api , news api , currency api , geocoding api , reverse geocoding api , country api
// we can use these api to get data and use it in our application

// JSON DATA FORMATE => JavaScript Object Notation
// most popular data format for sending and receiving data from a server

/*
//
// selecting element from DOM
const btn  = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////////

// creating  function
const getCountryData = function(country){
// create a new  XMLHTTPRequest  object 
// this object is used to  send a request to  a server 
const request = new XMLHttpRequest();

// configure the  request 
//'get'=> we want to  receive data 
// URL => API endpoint that return country data 
request.open('GET', `https://restcountries.com/v2/name/${country}`);
// send the request to server 
request.send();


// listen for  the  respnse from the server 
request.addEventListener('load' , function (){
    // convert JSON data from the server into a js object 
    // responseText is  a string -> json.parse convert it into js object 
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // create HTML using template literal 
    // data  from api is inserted dynnamically into html 
    const html = `
      <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.regin}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 100000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}}/p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `;
    // insert generatd html into page 
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
})

};

getCountryData('portugal');
getCountryData('usa');

*/

const countriesContainer = document.querySelector('.countries');

// function to display country data on UI
const renderCountry = function(data){

  const html = `
          <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)} </p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"> <span>💰</span>${data.currencies[0].name}</p>
          </div>
          </article>
    `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};



// // function to get country and its neighbour
// const getCountryAndNeighbour = function(country){

//   // create new XMLHttpRequest object
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   // when response is loaded
//   request.addEventListener('load', function(){
//   const [data] = JSON.parse(this.responseText);
//   console.log(data);

//   // render first country
//   renderCountry(data);

//     // get first neighbouring country code
//   const neighbour = data.borders?.[0];

//     // if no neighbour exists stop execution
//   if(!neighbour) return;

//     // second request to get neighbour country
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     // when neighbour data loads
//     request2.addEventListener('load', function(){
//     const data2 = JSON.parse(this.responseText);
//     console.log(data2);

//     // render neighbour country
//     renderCountry(data2);
//   });

// });

// };


// // start program by calling function
// getCountryAndNeighbour('portugal');




// ---------------------------------------
// Example of CALLBACK HELL
// ---------------------------------------

// setTimeout(() => {
//   console.log("1 second passed");

//   setTimeout(() => {
//     console.log("2 seconds passed");

//     setTimeout(() => {
//       console.log("3 seconds passed");

//       setTimeout(() => {
//         console.log("4 seconds passed");

//       },1000);

//     },1000);

//   },1000);

// },1000);


/*
Callback Hell explanation:

Multiple callbacks are nested inside each other.

Structure becomes pyramid / triangle:

setTimeout
   └── setTimeout
         └── setTimeout
               └── setTimeout

Problems:
1. Hard to read
2. Hard to debug
3. Hard to maintain

Solution:
Promises
Async / Await
*/

////////////////////////////////////////////////////////////////////////////

// OLD WAY TO AJAX CALL 
//  // create new XMLHttpRequest object
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();


// fetch method 

const request = fetch(`https://restcountries.com/v2/name/${'portugal'}`);
console.log(request); // o.p  => Promise {<pending>}

//! promise => an object that is  used as placeholder for the future result of an asynchronous operation 
// a container for an asynchronous delivered value 
// we no longer rely on event and callback passed into asynchronous function to handle asynchronous result ,
// instead of nesting call back , we can chain promises for  a sequence of asynchronous operation 

// ! PROMISE LIFECYCLE 

// 1:  PENDING => before the value is available
// 2:  SETTLED => asynchronous task has finished 
// 3: FULFILLED AND REJECTED => fulfilled =>  success the  value is now available
      // rejected => an error happened 

// CONSUME PROMISE => when we already havve a  promise ex- promise returned from fetch API

// DIFFERENCE BTW AJAX AND FETCH 
// AJAX (XMLHttpRequest) IS OLDAR WAY OF MAKING ASYNCHRONOUS HTTP REQUEST 
// FETCH API is modern way and it  return promises , making the code cleaner and easier to manage 

// FUNCTION TO GET COUNTRY DATA FROM API 
// const getCountryData = function(country){
//   fetch(`https://restcountries.com/v2/name/${'portugal'}`) // FETCH MAKE AN HTTP REQUEST AND RETURN A PROMISE  
//   .then(function (response){ //FIRST => .then() RUNS WHEN THE REQUEST IS  SUCCEESFUL , RESPONSE IS  THE  RAW RESPONSE OBJECT FROM THE SERVER 
//     console.log(response);
//     return response.json(); // CONVERT RESPONSE  BODY TO  JSON , json() ALOS RETURN PROMISE 
//   })
//   .then(function (data){ // SECOND => .then() RUNS WHEN JSON CONVERSION FINNISHED ,
//     console.log(data);      // DATA IS NOW JS OBJECT 
//     renderCountry(data[0]);
//   })
// }

// getCountryData('portugal');

// clean way 

const getCountryData = function(country){
  fetch(`https://restcountries.com/v2/name/${country}`)
  .then(response => response.json())
  .then(data => renderCountry(data[0]));
}
getCountryData('portugal');

// FLOW OF EXECUTION
// fetch() → returns Promise
//        ↓
// .then(response)
//        ↓
// response.json() → returns Promise
//        ↓
// .then(data)
//        ↓
// renderCountry(data[0])
