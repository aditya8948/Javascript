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
