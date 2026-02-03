/* JavaScript => it is 
- High level => focus on logic and product , no memory headache 
-garbage collector => it automatically removes unused variables and free memory , 
-interpreted(JIT compiled) => code s executed line by line 
=> modern js system use JIT(just in time ) compilationn for speed
-mutli paradigm => supports multiple programming styles :
>procedural
>object oriented 
>functional
- prototype based object oriented=> object inherits directly from object using prototypes
-first class function => function are treated like a variableegi
>can be stored in variable
> passed as argument
> returned from function
-dynamically type=> no need to declare data type 
-single threaded => js executes one task at a time on a sigle call stack
-non blocking => long tasks(API calls  timer, I/O) dont block the execution


-----------------------------------------------------------------------------------------------------------------------------------

!!! How a JavaScript Engine Works 
A JS engine is a program that reads, understands, and executes JavaScript code.

JavaScript Code
↓
Parsing
↓
Compilation (JIT)
↓
Execution
↓
Garbage Collection (running in background)

-----------------------------------------------------------------------------------------------------------------------------------------

1- parsing (reading your code)=>
    >js engine read your code 
    >Checks syntax (errors like missing } caught here)
    >convert code into AST (abstract syntax tree)
👉  AST is tree-structure version of your code, easy for engine to understand. 

2- compilation(JIT just in time)
    . js is not purely  interpreted anymore 
    > engine convert AST into machine code 
    > Uses JIT compilation:
       Compile → Execute → Optimize → Re-compile
    . Frequently used code is optimized for speed.

3- Execution (Where magic happens)
    >Execution happens in:
      .call Stack
        Executes one function at a time (LIFO)
        JS is single-threaded

    example =>
function a() {
  b();
}
function b() {
  console.log("hi");
}
a();

-- call stack flow ]=> 
a()
b()
console.log()


4- memory management 
    .heap> object and functions are stored here , it is large and unstructured memory
    .garbage collector > automatically removes unused memory , uses mark and sweep algorithm
     => You don’t control it, but bad code can still cause memory leaks.

5- Event Loop (Why JS is non-blocking)
    JS engine alone is not enough.
    Environment (Browser / Node.js) provides:
        >Web APIs (DOM, timers, fetch)
        >Callback queue / Microtask queue

in oneline =>
JS engine parses code → compiles it using JIT → executes it in a single-threaded call stack →
 manages memory with heap & garbage collector → uses event loop for async tasks.



 ----------------------------------------------------------------------------------------------------------------------------------------

!! Execution context 
        it is the environment where javaScript code runs,
        it is like a box which hold everything JS need to runs the code 
        each execution context has -
                                    varibale environment 
                                    scope chain 
                                    this keyword 
    
    > Types of execution context  

    1- global execution context  => 
        Created once when JS starts
        it contains : 
                    this (in browser -> window )
                    global variable 
                    global function
    
    2- function execution context =>
        created everytime when a function is call
        everytime a function is call js creats a new execution context for that call
        once a function is finised its execution context is destroyed


    -inside executionn context 
      > each execution context has two phase 
         Phase 1: Creation Phase (Memory Creation)
          jS scans the code before executing.
            What happens:
            Variables → undefined
            Functions → whole function stored
            this is decided
Example:

console.log(a);
var a = 10;
function foo() {
  console.log("hi");
}

Creation phase:

a → undefined
foo → function

This is why hoisting happens.

>Phase 2: Execution Phase (Code Runs Line by Line)
            Variables get actual values
            Functions are executed
            new execution contexts are created for function calls
            Execution Context + Call Stack 
            JS uses a Call Stack to manage execution contexts.
Example:

function one() {
  two();
}
function two() {
  console.log("hello");
}
one();

=>Call Stack flow:

Global EC
↓
one() EC
↓
two() EC
↓
console.log()

After execution:

two() removed
one() removed
Global remains


one line => Execution context is the environment where JS code is evaluated,
             created in two phases (memory + execution), and managed using the call stack.

.arrow functionn does not have this keyword , argument object

-------------------------------------------------------------------------------------------------------------
!!scope and scoping 

scoping => how our program variable are organized and accessed , where do variables live? 
lexical scoping => scoping is controlled by placement of function and block in the code 
scope => space or environment in which a certain variable is declared 
there is global , fuction and block scope 
scope in varibale => region of our code where a cetain variable can be accessed 

Global scope : outside of any function or block 
                variable declared in global scope are acceessible everywhere 
               example
                const name = 'aditya'
                const age = 27

function scope : variables are accessible only inside function , not ouside 
                    also called local scope 
            example 
                function calcAge(birthyear){
                const now = 2037
                const age = now - birthYear ;
                return age ;
                }

block scope : varibale are accesssible only inside block 
                it only applies to let and const variable 
                function are also blocked scope (only in strict mode )
            example 
                if(year > 1900 &&  year < 2005){
                let generation = "millenial ";
                }


> What is Scope Chaining? => how JavaScript looks for variables.
    When JS needs a variable, it:
        looks in the current scope
        If not found → goes to parent scope
        Keeps going upward
        Stops at global scope
        this chain is called the scope chain.
// JS looks upward only, never downward or sideways.
// scope chain has nothing to do with order in which function were called (call stack )


-----------------------------------------------------------------------------------------------

!Hoisting 
js moves declaration to the top of the scope during the creation phase 
- memory is allocated before execution 
- it is javascript behaviour of allocating memory for declaration before code execution

what js sees during creation phase ?
 - var => it is hoisted and initialized as undefined 
 - funtion hoisting => function declaration is fully hoisted , and store completely in memory
 example -
 hello();

function hello() {
  console.log("hi");
}
o/p => hi

- let and const => they are hoisted but kept in temporal dead zone(TDZ) and not accessible until declared 
 example -
 console.log(b);
let b = 10;

o/p => ReferenceError: Cannot access 'b' before initialization

- funtion expression and arrow function => they are depend upon variable declartion ,

! WHY HOISTING NEEDED ?
 => because js need to know about variable and function before exection
 -this is necessary so js can : 
  - handle funtion call before their defintion 
  -support recursion 
  - manage scope correctly 

! TEMPORAL DEAD ZONE (TDZ)=>
  it is a time between entering a scope and the the actual declaration of let/ const
- it exist to prevent unsafe access to variable before declaration 

!WHY TDZ INTRODUCED ?
  - to prevent bug cause by var 
  - to force safer code (force you to declare variable before using )

  hoisting => memory allocation
  tdz => access restriction



------------------------------------------------------------------------------
!THIS KEYWORD => THIS refer to the object that call the function and ots value is determined at runtime
    - THIS  is a reference to the object  that is executing the current function , but THIS  is not decided where funtoion is written , it decided how thwe funtion is called 
    - arrow function dont bind THIS , regular funtion do
    - THIS refer to the object that call the funtion and its value is determined at runtime 

    THIS in different situation 
     - global scope => console.log(this)
     o/p => 
        in browser =>  window 
        in nodee .js => {}(module object )
    
    - regular funtion call =>
       funtion show(){
        console.log(this);
        }
        show();
    o/p=>
      non strict => window 
      strict mode => undefined  
      beacuse no object is calling the function 
      
    - method call => 
      const user = {
         name: "Aditya",
         greet() {
             console.log(this.name);
       }
     };
   user.greet();
  o/p=> 
    this = user (aditya )
    because object before the dot call the function

    - arrow function => do not have THIS , inherit THIS from parent scope 
      const obj = {
            name: "A",
            greet: () => {
                console.log(this.name);
              }
          };
      o/p => undefined because arrow funtion takes this from global scope ,not obj
    
    
    - event listener (browser ) => <DOM element that hte handler attached to>
        button.addEventListener("click", function () {
             console.log(this);
          });
      o/p => this = button element 

  -Who is calling this function?”
      Object before dot → that object
      No object → undefined / window
      Arrow → parent scope’s this



-------------------------------------------------------------------------------------------------------------------------

memory management => js manage memmory autoomatically


  there  are two main memory  areas (stack and heap )

  - stack memory => it stores 
      - primitive valuse 
      - function execution context  
      - reference (address)
  
  - heap memory => it stores 
    -object 
    - array 
    -function


  -- primitive 
Number
String
Boolean
Undefined
Null
Symbol
BigInt
(they  directly store in stack )

-- object 
Object
Array
Function
(they stored in heap , variable stores reference )



--------------------------------------------------------------------------

shallow copy and deep  copy 

Shallow copy => new object , but nested object are still shared (onyl the first  leave;  is copied )

example => 

const user1 = {
  name: "A",
  address: {
    city: "Delhi"
  }
};

const user2 = { ...user1 };

user2.name = "B";
user2.address.city = "Mumbai";

console.log(user1.name);         // A
console.log(user1.address.city); // Mumbai ❗ //address → object → reference copied


- WAYS TO  CREATE SHALLOW COPY 
 { ...obj }
Object.assign({}, obj)
Array.slice()
Array.from()


 - Deep copy = > completly new objecct , including nested object (no shared reference )
  example => 
    const user2 = JSON.parse(JSON.stringify(user1));
user2.address.city = "Mumbai";

console.log(user1.address.city); // Delhi ✅

- limitation of JSON method  => losses date , map , set , remove function 

- best modern way (structured clone ) => 
    const  deep = structuredClone(user1);

✔️ Handles:

nested objects
arrays
dates
circular refs


--------------------------------------------------------------------------------------------------------------------------
 Garbage collection => it is how js automatically freees memory that is no longer needed . we  dont delete it manually js automatically delete it 
 - gc fress heap memory not stack memory - it freed automatically when function execution end or functionn executiion is popped 


- GC uses mark and sweep algorithm 
 - a value is reachable if it can accessed from global scope or from current runnig scope function or
  from other reachable object
   
  1- mark all reachable object 
  2- sweep everything unnmarked 

  - real world memory leak => GC is  automatic but  bad code can prevent gc
   - when object  are no longer needed are incorrectly still reachable and therefore not being garbage collected 

  - forgotten references 
  - global variable (global stays reachable forever )
  - event listener not remove  
    element.addEventListener("click", handler);
    // element removed but listener still exists ❗


  -- closure => it is function that remember variable from its outer scope even after that outer function has finished execution
   -Closures keep memory because the inner function still needs those variables.
