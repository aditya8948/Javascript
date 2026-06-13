/*
    GENERATORS IN JAVASCRIPT

    1. What is a generator?
       A generator is a special function that can pause and resume.

       Normal function:
           Runs from top to bottom once.
           When it returns, it is finished.

       Generator function:
           Can pause at yield.
           Can continue later from the same place.
           Produces values one by one.

    2. Generator syntax

       function* generatorName() {
           yield value1;
           yield value2;
           yield value3;
       }

-Important keywords:

       function*:
           Defines a generator function.

       yield:
           Pauses the generator and sends a value outside.

       next():
           Resumes the generator until the next yield or return.

       value:
           The value produced by yield or return.

       done:
           false means generator can still continue.
           true means generator is finished.

       return:
           Ends the generator.

       yield*:
           Delegates/yields values from another iterable or generator.

3. Generator function vs generator object

       function* myGenerator() {}
           This is the generator function.

       const gen = myGenerator();
           This creates a generator object.

       The generator object is both:
           - an iterator, because it has next()
           - an iterable, because it has [Symbol.iterator]()

4. Why use generators?
       - To create iterators easily.
       - To produce values lazily.
       - To avoid creating big arrays in memory.
       - To pause and resume logic.
       - To build custom sequences.
       - To understand async generators later.

5. Generator and iterator connection
       A generator is the easiest way to create an iterator.

       Manual iterator:
           You write next() yourself.

       Generator:
           JavaScript creates next() behavior for you.
*/

// ---------------------------------------------------------------------------
// 1. Basic generator

function* simpleGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen1 = simpleGenerator();

console.log("Basic generator:");
console.log(gen1.next()); // { value: 1, done: false }
console.log(gen1.next()); // { value: 2, done: false }
console.log(gen1.next()); // { value: 3, done: false }
console.log(gen1.next()); // { value: undefined, done: true }

/*
    Each next() call resumes the function.

    First next():
        Runs until yield 1.

    Second next():
        Continues after yield 1 and runs until yield 2.

    Third next():
        Continues after yield 2 and runs until yield 3.

    Fourth next():
        No more yield, so done becomes true.
*/

// ---------------------------------------------------------------------------
// 2. Generator with for...of


console.log("\nGenerator with for...of:");

for (const value of simpleGenerator()) {
    console.log(value); // 1, 2, 3
}

/*
    for...of automatically calls:
        generator[Symbol.iterator]()
        generator.next()
        generator.next()
        generator.next()

    It stops when done becomes true.
*/

// ---------------------------------------------------------------------------
// 3. Generator is both iterator and iterable
// 

const gen2 = simpleGenerator();

console.log("\nGenerator is iterator and iterable:");
console.log(typeof gen2.next); // function
console.log(gen2[Symbol.iterator]() === gen2); // true

/*
    gen2 has next(), so it is an iterator.
    gen2 has [Symbol.iterator](), so it is iterable.

    That is why generators work with:
        for...of
        spread operator
        destructuring
        Array.from()
*/

// ---------------------------------------------------------------------------
// 4. Spread, destructuring, and Array.from with generators
// ---------------------------------------------------------------------------

console.log("\nGenerator utilities:");

console.log([...simpleGenerator()]); // [1, 2, 3]

const [first, second] = simpleGenerator();
console.log(first, second); // 1 2

console.log(Array.from(simpleGenerator())); // [1, 2, 3]

/*
    Important:
    A generator object gets consumed.

    Once you finish using it, it cannot restart.
    If you want values again, call the generator function again.
*/

const onceOnly = simpleGenerator();

console.log("\nGenerator gets consumed:");
console.log([...onceOnly]); // [1, 2, 3]
console.log([...onceOnly]); // [], because it is already finished

// ---------------------------------------------------------------------------
// 5. Generator with return
//  

function* generatorWithReturn() {
    yield "start";
    return "finished";
    // Code after return will not run.
    // yield "never runs";
}

const gen3 = generatorWithReturn();

console.log("\nGenerator with return:");
console.log(gen3.next()); // { value: 'start', done: false }
console.log(gen3.next()); // { value: 'finished', done: true }
console.log(gen3.next()); // { value: undefined, done: true }

/*
    return ends the generator.

    Note:
    for...of ignores the final return value.
    It only loops over values where done is false.
*/

console.log("\nfor...of ignores return value:");
for (const value of generatorWithReturn()) {
    console.log(value); // only "start"
}

// ---------------------------------------------------------------------------
// 6. Generator with parameters
// ---------------------------------------------------------------------------

function* countFrom(start, end) {
    for (let current = start; current <= end; current++) {
        yield current;
    }
}

console.log("\nGenerator with parameters:");
console.log([...countFrom(5, 10)]); // [5, 6, 7, 8, 9, 10]

/*
    This is a common use case:
    generate a sequence without writing a full array manually.
*/

// ---------------------------------------------------------------------------
// 7. Infinite generator
// ---------------------------------------------------------------------------

function* infiniteNumbers() {
    let number = 1;

    while (true) {
        yield number;
        number++;
    }
}

const infinite = infiniteNumbers();

console.log("\nInfinite generator:");
console.log(infinite.next().value); // 1
console.log(infinite.next().value); // 2
console.log(infinite.next().value); // 3

/*
    This generator can produce numbers forever.

    Be careful:
    Do NOT do this:

    [...infiniteNumbers()]

    That tries to spread infinite values into an array and will never finish.
*/

// ---------------------------------------------------------------------------
// 8. Passing values into a generator using next(value)
// ---------------------------------------------------------------------------

function* conversationGenerator() {
    const name = yield "What is your name?";
    const language = yield `Hello ${name}, what are you learning?`;
    return `${name} is learning ${language}`;
}

const conversation = conversationGenerator();

console.log("\nPassing values into generator:");
console.log(conversation.next()); // Starts generator, stops at first yield
console.log(conversation.next("Aditya")); // Sends "Aditya" into name
console.log(conversation.next("JavaScript")); // Sends "JavaScript" into language

/*
    Very important:
    The first next() starts the generator.
    A value passed to the first next(value) is usually ignored because there
    is no paused yield waiting to receive it yet.

    In this line:
        const name = yield "What is your name?";

    First next():
        Gives out "What is your name?"

    Second next("Aditya"):
        Sends "Aditya" back into the paused yield expression.
        So name becomes "Aditya".
*/

// ---------------------------------------------------------------------------
// 9. yield* delegates to another iterable
// ---------------------------------------------------------------------------

function* letters() {
    yield "A";
    yield "B";
}

function* numbers() {
    yield 1;
    yield 2;
}

function* combinedGenerator() {
    yield* letters();
    yield* numbers();
    yield* ["x", "y", "z"];
}

console.log("\nyield* example:");
console.log([...combinedGenerator()]); // ['A', 'B', 1, 2, 'x', 'y', 'z']

/*
    yield* means:
    "Take all values from another iterable/generator and yield them here."

    It can work with:
        another generator
        array
        string
        set
        map
        any iterable
*/

// ---------------------------------------------------------------------------
// 10. Generator inside an object
// ---------------------------------------------------------------------------

const playlist = {
    songs: ["Song 1", "Song 2", "Song 3"],

    *[Symbol.iterator]() {
        for (const song of this.songs) {
            yield song;
        }
    }
};

console.log("\nGenerator inside object:");
for (const song of playlist) {
    console.log(song);
}

/*
    This makes playlist iterable.

    Because playlist has:
        [Symbol.iterator]()

    And that method is a generator method:
        *[Symbol.iterator]() {}
*/

// ---------------------------------------------------------------------------
// 11. Manual iterator vs generator
// ---------------------------------------------------------------------------

function createManualRange(start, end) {
    let current = start;

    return {
        next() {
            if (current <= end) {
                return {
                    value: current++,
                    done: false
                };
            }

            return {
                value: undefined,
                done: true
            };
        }
    };
}

function* createGeneratorRange(start, end) {
    for (let current = start; current <= end; current++) {
        yield current;
    }
}

console.log("\nManual iterator vs generator:");

const manualRange = createManualRange(1, 3);
console.log(manualRange.next());
console.log(manualRange.next());
console.log(manualRange.next());
console.log(manualRange.next());

console.log([...createGeneratorRange(1, 3)]);

/*
    Manual iterator:
        More code.
        More control.
        You write next() yourself.

    Generator:
        Less code.
        Easier to read.
        JavaScript creates next() behavior automatically.
*/

// ---------------------------------------------------------------------------
// 12. Error handling with generator.throw()
// ---------------------------------------------------------------------------

function* errorHandlingGenerator() {
    try {
        yield "before error";
        yield "after first yield";
    } catch (error) {
        yield `caught error: ${error.message}`;
    }

    yield "generator continues";
}

const gen4 = errorHandlingGenerator();

console.log("\nGenerator throw():");
console.log(gen4.next()); // { value: 'before error', done: false }
console.log(gen4.throw(new Error("Something went wrong"))); // caught inside generator
console.log(gen4.next()); // generator continues
console.log(gen4.next()); // done true

/*
    generator.throw(error) throws an error inside the generator at the paused
    yield position.

    If the generator has try...catch, it can catch that error.
*/

// ---------------------------------------------------------------------------
// 13. Stopping a generator with return()
// ---------------------------------------------------------------------------

function* stoppableGenerator() {
    yield "first";
    yield "second";
    yield "third";
}

const gen5 = stoppableGenerator();

console.log("\nGenerator return():");
console.log(gen5.next()); // { value: 'first', done: false }
console.log(gen5.return("stopped now")); // { value: 'stopped now', done: true }
console.log(gen5.next()); // { value: undefined, done: true }

/*
    generator.return(value) stops the generator early.
    After return(), the generator is finished.
*/

// ---------------------------------------------------------------------------
// 14. Common mistakes
// ---------------------------------------------------------------------------

/*
    Mistake 1:
    Calling a generator function and expecting the body to run immediately.

    function* demo() {
        console.log("runs");
    }

    const gen = demo(); // body does not run yet
    gen.next();         // body starts running here

    Mistake 2:
    Forgetting that generators get consumed.

    const gen = simpleGenerator();
    [...gen]; // [1, 2, 3]
    [...gen]; // []

    Mistake 3:
    Using spread on an infinite generator.

    [...infiniteNumbers()] // never ends

    Mistake 4:
    Thinking return value appears in for...of.

    for...of ignores the final return value where done is true.

    Mistake 5:
    Passing a value into the first next(value).

    The first next() starts the generator.
    Values passed to the first next(value) usually have nowhere to go.
*/

// ---------------------------------------------------------------------------
// 15. Quick summary
// ---------------------------------------------------------------------------

/*
    Generator:
        A function that can pause and resume.

    function*:
        Creates a generator function.

    yield:
        Pauses and produces a value.

    next():
        Resumes the generator.

    next(value):
        Sends a value back into the paused yield expression.

    return:
        Ends the generator.

    yield*:
        Delegates to another iterable.

    Generator object:
        Is both iterator and iterable.

    Best use:
        Cleanly create custom sequences and iterator behavior.
*/
