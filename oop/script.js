'use strict';

/* 
oop is a programming paradigm(style of code 'how' we write  and organize code ) based on the concept of object .

we use object to model(describe) real world or abstract features 
Object may contain data(properties) and code (methods). by using object we pack data and the corresponding behavior into one block
In oop object are self contained peices 

Interaction happen through a public interface(API) : method that  the code outside of the object can acces and use to communnicate with the object

oop was developed with goal of organizing code to make it more flexible and easier to  maintain 


// !classes and instances 

class => class is like a blueprint from which we can create new object 
javascript is  not class based like java /c++
js is prototype based 
example=> 
it is blueprint of object what we  need for our work 
User{
user 
password
email

login(password){
//login logic
}

sendMessage(str){
// sending logic
}
}

// instance 
// new object created from the class. like a real house created from an abstract blueprint
user ={
user = 'ansh',
password = '1234',
email = 'shubham@gmail.com',

login(password){
//loginn logic
}
sendMessage(str){
// messgae logic}
}


//!how do  we actually design classes ? how do  we model real world data  into clases ?

// for this we have four  pillar of oops which define how a good class implemented

//1 => Abstraction 
    ignoring or  hiding detail that dont matter , allowing us to get  an overview perspective of the thing we are implementing , 
    instead of messing with detail that dont really matter to our implementation

//2=> encapsulation => keeping the properties and method private inside the class ,
     so they are not accessible from outside the class , some methods can be exposed as public interface (api)

     why ?
     - to prevent external from accidentally manipulatin internal properties /state 
    - allow to change internal implementation without the risk of breaking external  code  

//3 => inheritance => making all properties and method of certain class available to the child class ,
//                    this allows us to reuse common logic and to model real world relationnship

child class extends parent class means child class inherits all the propertoes andd method of parent class also it can have its own properties and method

// 4=> polymorphism => a child class can overwrite a method it innherit from a parent class 
                    -method can be overwritten which is inherited by parent class



// ------------------------------------------------
!oops in javascript : prototype 

prototype (contain method )
    ^
    |
    |
    |
object (can access the method)

object are linked to a prototype object 

-prototypal inheritence : the prototype contains method (behaviour) that are accessible to  all object linked to that prototype

example => we use map  method in array , there array.prototype is the prototype of all array ibject we create in javascript , therefore all  array have access to the map method 


//! how do we create  prototype ?

there are 3 ways of implementing prototypal innheritence in js 

1=> constructor function 
    -technnique to create object from a function
    -this is how  built-in object like array , maps or set are actually implemented 

2=> ES6 
    - modern alternative to constructor function syntax 
    -"syntactic suger" behind the scene ,ES6 classes work exactly like constructor functionn;
    -ES6 classes do not behave  like classes in classical oop;

3=> object.create()
    -the easiest and most straightforward way of linking an object to a prototype object 


// ------------------------------------------------------------------

// ! creating a constructor => in js creating constructor is same as creating function
// as in js for class there  is  not any syntax we use constructor   
//Constructor functions in JavaScript are regular functions used with the 
//new keyword to create multiple objects that share methods via the prototype.

// Constructor Function
// In JavaScript, a constructor is just a normal function.
// What makes it a constructor is using the `new` keyword.
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //  Never define methods inside the constructor
  // This would create a new copy of the method for every object
  
  //this.calcAge = function () {
   // console.log(2037 - this.birthYear);
  };
 
};

// Creating objects (instances) using the constructor function
const jonas = new Person('Jonas', 1991);
const aditya = new Person('Aditya', 2005);
const shubham = new Person('Shubham', 2000);

// what happens when new person () is called  
// 1. new {} (object) is created 
// 2. function is called , this = {}
// 3. {} linked to prototype
// 4. function automatically return {}




// we can also check whether any variable is instance of constructor or not 

console.log(aditya instanceof Person);    // o/p -> true 



//! prototype => it is an object from which other object inherit properties and method , 
//   it is object of constructor object , in which all the method and also can have properties in it 

// the real problem it solve each object has its own copy of method , waste memory
// keep method in one shared place all objet use that place that  shared place is called prototype
// shared by all instance , memory efficient , enables inheritance 
// object  dont own method - they borrow them from prototype 


Person.prototype.calAge = function() {
    console.log(2037 - this.birthYear)
};

jonas.calAge();  // 46 

//step by step lookup
// 1=> js looks for calcAge on jonas
// 2=> not found
// 3=> js found at jonas.__proto__
// 4=> found in person.prototype
// 5=> method run with this = jonas

// person.prototype meaning object used by instance 
// obj.__proto__ meaining reference to its prototype 

// jonas.calAge === aditya.calAge ; // true 

Person.prototype.species = 'Homo Sapiens';

console.log(jonas.species) // o/p => Homo Sapiens

// by this is not jons ownproperty , it is inherit from prototype object

// .hasOwnProperty => check where object has its own property or not 
console.log(jonas.hasOwnProperty('species')) // o/p=> false

// prototype chain => series of links between object ,  linked trough prototype (similar to the scope chain)

// .__proto__ => gives the prototype of the object 

// prototype of array 

const arr= [1,2,3,4,4,2,3,1,2] // new Array === []

console.log(arr.__proto__) ; // gives all method/properties of array 
console.log(arr.__proto__ === Array.prototype); // true 

// we can create our own method which which can be  implemented by all array 

Array.prototype.unique = function(){
    return [...new Set(this)];
}

console.log(arr.unique()); //o/p  [1,2,3,4]

*/

// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h


const carSpeed = function(carName , speed){
    this.carName = carName;
    this.speed = speed;
};

carSpeed.prototype.accelerate = function(){
    console.log(`'${this.carName}' going at ${this.speed + 10} km/h`);
};

carSpeed.prototype.brake = function(){
    console.log(`'${this.carName}' going at ${this.speed - 5} km/h`);
}

const bmw = new carSpeed('BMW' , 120);
const mercedes =  new carSpeed('Mercedes' , 100);
bmw.accelerate() // 'BMW' going at 130 km/h
mercedes.accelerate(); // 'Mercedes' going at 105
bmw.brake();   // 'BMW' going at 115 km/h



// ------------------------------------------------------

// CLASSES IN JAVASCRIPT
// JavaScript does not implement classical OOP like Java or C++
// Instead it uses PROTOTYPES internally.
// ES6 classes are just a cleaner syntax (syntactic sugar) over
// constructor functions and prototype-based inheritance.

// IMPORTANT CHARACTERISTICS OF JS CLASSES

// 1. Classes are NOT hoisted
//    → Unlike function declarations, you cannot use a class
//      before it is defined in the code.

// 2. Classes are first-class citizens
//    → This means classes behave like normal values.
//      They can be passed into functions or returned from functions.

// 3. Classes run in STRICT MODE automatically
//    → You don't need to write 'use strict', it is already enabled.

// -------------------------------------------------------------

// Classes can be defined in two ways, similar to functions:

// Class expression
// const personCl = class {};

// Class declaration

class personCl {
    
    // The constructor method is automatically called
    // when a new object (instance) is created using `new`.

    constructor(fullName , birthYear){

        // These properties are called INSTANCE PROPERTIES because each object created from this class  will get its own copy of these values.
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    
    // instance method (object method )
    // Any method written inside the class body  but OUTSIDE the constructor is automatically
    // added to the class prototype.

    calAge() {
        console.log(2037 - this.birthYear);
    }

    greet() {
        console.log(`hey ${this.firstName}`);
    }

    // using  get and set 

    get age(){
        return 2037-this.birthYear;
    }

    set fullName(name){
        if(name.includes(' ')){
            this._fullName = name;
        }
        else{
            console.log('name must include first  and last name ')
        }
    }


    // static method (classs method  )
    
    static hey(){
        console.log('Hey there ');
        console.log(this);  // this will point to class 
    }


}

const  jessica = new personCl('jessica' , 2001);

// jessica.hey();// cant be accesed because hey() is attached to personCL , not to personCl.prototype 

// personCl.hey();   // Hey there 


// Creating an INSTANCE (object) from the class.
// This works exactly like constructor functions using the `new` keyword.

// const  jessica = new personCl('jessica' , 2001);

console.log(jessica);
// Output:
// personCl { firstName: 'jessica', birthYear: 2001 }

// Calling methods that are stored on the prototype.
// the object accesses them through the prototype chain.

jessica.calAge();   // 2037 - 2001 → 36
jessica.greet();    // hey jessica

// Every object created with a class has a hidden property
// called [[Prototype]] which we can access with __proto__.
// `jessica` is the same as personCl.prototype.
console.log(jessica.__proto__ === personCl.prototype);

// true → means jessica inherits methods from personCl.prototype



//! getter and setter 
// => getter and setter allow us  to access and modify properties like normal variable but using function internally
// usefull for 
// -controlling how dat is read 
// -validating data before updating 
// -computing values dynamically 

const account =  {
    owner : 'aditya',

    movements: [200,300,-100,500],

    // GETTER => allows us to read a value like a property , but internally it executes a function
// it must return something , use like property 
    get latest(){
        return this.movements.slice(-1).pop();
    },

    //SETTER => allows us  to set/update a value but internally runs a function
    // it  must take exactly one parameter 
    // they allow validation before storing data
    // assinging a value to a property automatically trigge the  setter 
    set latest(mov){
        this.movements.push(mov);
    }

}

//using getter we dont  use parenthesis 
console.log(account.latest); //500

//using setter (assinging value like a property 
account.latest = 1000;
console.log(account.movements);  // [ 200, 300, -100, 500, 1000 ]



// ! static method  => it belings to the class itself , not to the object created frm the class 
// simple meaning => class => can use the  sattic method , Object =>  cant  use the static method 
// thye  are used for  helper / utility related to  the class , they dont  need an object 
// example 
// Array.from();   // it  will  work because it attached to array constructor 

// Array.from('hello');  // it will not work 

// constructor function version

// const Person = function(name){
//   this.name = name;
// };

// Person.hey = function(){
//   console.log("Hello from static method");
// };


// call => person.hey();


//----------------------------------------
// object.create() => its is  the  thord way to implement oop inn javascript 


// it creates a new object  and  directly sets its prototype 
// new object  => llinked to tprrotype you provide 

// syntax  => object.create(prototypeObject)  // the new object will inherit from prototypeobject 


const personProto = {
    calAge(){
        console.log(2037 -this.birthYear);
    },

    // inherit method 

    init(firstName , birthYear){
        this.firstName = firstName,
        this.birthYear = birthYear
    }
};

const jonas = Object.create(personProto);
jonas.name = 'jonas';
jonas.birthYear = 1991;

jonas.calAge(); // 46

// DIFFERENCE btw CONSTRUCTOR AND  OBJECT.CREATE  

// const jonas = new personCl('jonas' , 1991);  here  prototype is  set  automatically

// but in object create we manually set  thee prototype 

// instead of assinging properties manually , we can create an inherit method 

const steven = Object.create(personProto);
steven.init('steven' , 2001);
steven.calAge(); // 36 


//////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

*/
/*
class carC1 {
    constructor(make , speed){
        this.make = make ,
        this.speed = speed
    }
     accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

    get speedUS(){
        return this.speed / 1.6;
    }

    set speedUS(speed){
        this._speedUS = speed*1.6;
    }
}

const  ford = new carC1('ford' , 120);

console.log(ford.speedUS);  // 75
ford.accelerate();          //ford is going at 130 km/h
ford.accelerate();          //ford is going at 140 km/h
ford.brake();               // ford is going at 135 km/h
ford.speedUS = 50;
console.log(ford);          // carC1 { make: 'ford', speed: 135, _speedUS: 80 }



// -----------------------------------------------------------------------------

// Inheritance between "classes" : construtor functions

// parent construtor  function 
const person  = function(firstName , birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;
}
person.prototype.calcAge = function(){
    console.log(2037 - this.birthYear);
}

// child construtor function 
// this construtor will inherit from person
const student = function(firstName , birthYear , course){
    // this.firstName = firstName;  // these line are repeated as person class 
    // this.birthYear = birthYear;
    // instead of  repeating properties from person we call the person constructor and  bind 'this'

    person.call(this, firstName , birthYear); // use call method to set this 
    this.course = course;

}

// linking prototype (this creates inheritance )
// / student.prototype should inherit from person.prototype
student.prototype = Object.create(person.prototype);

// add method to student 
student.prototype.introduce = function(){
    console.log(`hey my name  is  ${this.firstName} ans I study ${this.course}`);
}

// instance  of  student 
const mike = new student('mike' , 2000 , 'computer science');
mike.introduce();  // hey my name  is  mike ans I study computer science

// because student inherit from person , mike  can also use person method
mike.calcAge();  // 37

console.log(mike instanceof student); // true 
console.log(mike instanceof person); // true 
// beacuse student prototype is linked with person prototype and construtor thinkits  the instance of person class 
//  chain goes  like
// mike
//  ↓
// Student.prototype
//  ↓
// Person.prototype
//  ↓
// Object.prototype
//  ↓
// null


// fix construtor reference 
// after linking  prototype using Object.create  the  construtor propety point to  person so we rest  it  bback to  student 

student.prototype.construtor =  student;
console.log(mike instanceof person); // true 




//  Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

*/
/*

const  car  = function(make , speed){
    this.make =  make ;
    this.speed = speed;
}

car.prototype.acceleerate = function(){
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h `);
}
car.prototype.brake = function(){
    this.speed -= 5;
      console.log(`${this.make} going at ${this.speed} km/h `);
}


const EV = function( make , speed , charge){
    car.call(this, make , speed);
    this.charge =  charge ;

}
// liinking  prototype 
EV.prototype = Object.create(car.prototype);

EV.prototype.chargeTo = function(chargeTO){
    this.charge = chargeTO;
};

EV.prototype.acceleerate = function(){
    this.speed += 20;
    this.charge -= 1;
    console.log(`${this.make} going at ${this.speed} , with a charge of  ${this.charge}`);
};

const  Tesla  = new EV('Tesla' , 140 , 23);
console.log(Tesla); // car { make: 'Tesla', speed: 140, charge: 23 }
Tesla.acceleerate();  // esla going at 160 , with a charge of  22
Tesla.brake();        // Tesla going at 155 km/h 
Tesla.chargeTo(45);
console.log(Tesla.charge); // 45



// ___________________________________________________________________________________________

// inheritance between classes : ES6 classes 

// parent class 
class person {
    constructor(fullName , birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    set fullName(name){
        if(name.includes(" ")) this._fullName = name;
        else console.log("enter full name ");
    }

    greet(){
        console.log(`hey ${this._fullName}`);
    };

    clacAge(){
        console.log(2037 - this.birthYear);
    }
};

/// chlid class =>  extend creates prototype inheritance 
class student extends person{
    constructor(fullName , birthYear , course){
        //always need to happen first 
        super(fullName , birthYear);
        this.course = course; 
    }

    introduce(){
        console.log(`my name is ${this._fullName} and i study ${this.course}`);
    }

    //  override 

    clacAge(){
        console.log(`my age is ${2037 - this.birthYear}`);
    }
}


// instamce 

const shubham = new student('Shubham sharma' , 2000 , 'computer science ');
console.log(shubham);
// student {
//   _fullName: 'Shubham sharma',
//   birthYear: 2000,
//   course: 'computer science '
// }


shubham.introduce();  // my name is Shubham sharma and i study computer science 
shubham.clacAge();    // my age is 37



// ----------------------------------------------------------------------
// inheritance between "classes" : object.create 
// here we manually create  prototype lins instead of usinng classes or constructor

// parent class prototype  
const  personProto = {
    clacAge (){
        console.log(2037 - this.birthYear);
    },

    init(firstName , birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
};

// create  student prototype that  inherit from personProto

const studentProto = Object.create(personProto);

// call parent init method to  reuse code 
studentProto.init = function(firstName , birthYear , course) {
    personProto.init.call(this , firstName , birthYear);
    this.course = course ;
};

studentProto.introduce = function(){
     console.log(`my name is ${this.firstName} and i study ${this.course}`);
}
const jay = Object.create(studentProto);
jay.init('jay' ,2000, 'computer science');
console.log(jay);

jay.introduce(); //my name is jay and i study computer science

jay.clacAge(); // 37

// prototype chain 
// jay
//   ↓
// studentProto
//   ↓
// personProto
//   ↓
// Object.prototype




// -------------------------------------------------------------------

// ENCAPSULATION => means hiding internal data of class and exposing only controlled methods to  interact with data 

// why  ?  to prevent external code from directly modifying sensitive data 

// in modern js we have 
//1> public field
//2> private field(#)
//3> public method
//4> private method(#)
// static versionn of these 4
class account {
    //PUBLIC FIELD
    // these properties are added to every instance of  class and accessible outside of class 

    bank = 'bankist ';
    branch = 'BAN';
    
// PRIVATE FIELD => '#' make them private , they  are only accessible  inside  the class 

    #movements =[]; 
    #pin;        // private field  declared here initialized later 

    constructor(owner , currency , pin){
        this.owner= owner;
        this.currency = currency;
        this.#pin = pin;  // initialize it 
        // this.movements = [];// no need of  this 
    }

    // public method (API) 
    // these are the only way external code should interatc  with private data 

    
    getMovements(){
        return this.#movements;
    }
    deposit(val){
        this.#movements.push(val);
        return this;  // for  chaining
    }

    withdraw(val){
        // reuse deposit method instead of duplicating it 
        this.deposit(-val);
        return this;
    }


    requestLoan(val){
        if(this.#approvedLoan(val)){
            this.deposit(val);
            console.log('loan approved');
        }
        return this; // for chaining (this => movements)
    }

    // private  method => cant access from outside , they used internally
    #approvedLoan(val){
        //fake method
        return true;
    }

}

const acc1 = new account('aditya' , "RS" , 1111);
console.log(acc1);
acc1.deposit(230);
acc1.deposit(240);
acc1.withdraw(100);
// trying access private field cause error beaue they  are no accessible outside class
// console.log(acc1.#movements); // gives error of private  field cant access outside class 


// chaining method 
const movement = acc1
.deposit(300)
.withdraw(100)
.withdraw(50)
.requestLoan(2500)
.withdraw(400)
.getMovements();

console.log(movement);// [  230,  240, -100, 300, -100,  -50, 2500, -400
   
*/

// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%
*/