// / Demo example

// function fetchData(url){
//     return new Promise(function(res , rej){
//         console.log('started downloading from ' , url);
//         setTimeout(function() {
//             let data = "dummy data ";
//             console.log("download data ");
//             res(data);
//         }, 7000);
//     });
// }

// console.log("start");
// let p = fetchData('dfgh');
// p.then(function(data){
//     console.log("value is " ,data);
// })

// console.log('end');

// o/p => 
// start
// started downloading from dfgh 
// end 
// download data 
// value is dummy data

// ///////////////////////////////////////////////////////////

// Demo example 2

// console.log("start of the file ");

// setTimeout(function (){
//     console.log("timer 1 done ");
// },0);

// for(i = 0 ; i <1000000000 ; i++) {}

// let x = Promise.resolve('sankets promise ');
// x.then(function(val){
//     console.log("whose promise?" , val );
// });

// setTimeout(() => {
//     console.log("timer 2 done");
// }, 0);

// console.log("end of the file ");

// o/p =>
// start of the file 
// end of the line 
// whose promise? sankets promise 
// timer 1 done 
// timer 2 done


///////////////////////////////////////////////////////////////////

function blockingLoop(){
    for(i =0 ; i < 10000000; i++){}
}

console.log("start of the file ");

setTimeout(function (){           
    console.log("timer 1 done ");
},0);

blockingLoop();
let x = Promise.resolve('sankets promise1');
x.then(function(val){                    
    console.log("whose promise?" , val );
    blockingLoop();
});
let y = Promise.resolve('sankets promise2');
y.then(function(val){                     
    console.log("whose promise?" , val );
    setTimeout(()=> {console.log("ok done")} , 0); 
});
let z = Promise.resolve('sankets promise3'); 
z.then(function(val){
    console.log("whose promise?" , val );  
});

setTimeout(() => {
    console.log("timer 2 done");     
}, 0);
console.log("end of the file ");

// o/p -> 
// start of the file 
// end of the file 
// whose promise? sankets promise 1
// whose promise? sanket promise 2
// whose promise? sanket promise 3
// timer 1 done 
// timer 2 done
// ok done 