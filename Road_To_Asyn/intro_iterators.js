/*
    ITERATORS IN JAVASCRIPT

    1. What is an iterator?
       An iterator is an object that knows how to return values one by one.
        In JavaScript, the standard iterator shape is:

        {
           next() {
               return {
                   value: someValue,
                   done: false
               };
           }
       }

       The next() method returns an object with two important properties:

       value:
           The current value produced by the iterator.

       done:
           A boolean.
           false means more values may still come.
           true means iteration is finished.

    2. Iterator protocol
       "Protocol" means a rule/contract that JS expects an object to follow.

       Iterator protocol says:
       - The object must have a next() method.
       - next() must return an object.
       - That returned object usually has { value, done }.

    3. Iterable protocol
       An iterable is an object that can create/return an iterator.

       To be iterable, an object must have this special method:

       [Symbol.iterator]()

       This method must return an iterator object.

       Example:
       const arr = [10, 20, 30];
       const iterator = arr[Symbol.iterator]();

       Arrays, strings, maps, sets, NodeLists, etc. are already iterable.

    4. Iterator vs Iterable
       Iterator:
           The object that has next().

       Iterable:
           The object that has [Symbol.iterator]().

       Many built-in objects are iterable:
           Array, String, Map, Set.

       Plain objects are NOT iterable by default:
           const obj = { name: "Aditya" };
           for (const x of obj) {} // TypeError

    5. Important keywords and tools

       next():
           Manually gets the next value from an iterator.

       value:
           The value returned by next().

       done:
           Tells whether the iterator is finished.

       Symbol.iterator:
           Special built-in symbol used to define iterable behavior.

       for...of:
           Loop used for iterable values.

       yield:
           Used inside generator functions to produce values one by one.

       function*:
           Creates a generator function.

       return:
           Inside an iterator/generator, it can end iteration.

    6. Why use iterators?
       - To process values one at a time.
       - To avoid loading everything at once.
       - To create custom looping behavior.
       - To build lazy sequences.
       - To understand generators, async iterators, streams, and for await...of.

    7. Where are iterators used automatically?
       JavaScript internally uses iterators in:

       for...of
       spread operator: [...iterable]
       destructuring: const [a, b] = iterable
       Array.from(iterable)
       Map and Set constructors
       Promise utilities with arrays/iterables

    8. Manual iterator idea
       Your original function below is a "manual iterator-like fetcher".

       It uses closure:
       - idx is private.
       - next() remembers idx even after fetchValue() has returned.
       - Each next() call gives the next element.

       But your first version returned only the value or undefined.
       The official JS iterator protocol returns { value, done }.
*/

// ---------------------------------------------------------------------------
// 1. Manual iterator-like fetcher

function fetchValue(arr) {
    let idx = 0;

    function next() {
        if (idx === arr.length) return undefined;

        const nextElement = arr[idx];
        idx++;
        return nextElement;
    }

    return { next };
}

const automaticFetcher = fetchValue([1, 2, 3, 4, 3]);

console.log("Manual fetcher:");
console.log(automaticFetcher.next()); // 1
console.log(automaticFetcher.next()); // 2
console.log(automaticFetcher.next()); // 3
console.log(automaticFetcher.next()); // 4
console.log(automaticFetcher.next()); // 3
console.log(automaticFetcher.next()); // undefined, because there are no values left

/*
    Important note:
    This is useful for understanding the idea, but it is not a complete
    JavaScript iterator because next() does not return { value, done }.
*/

// ---------------------------------------------------------------------------
// 2. Proper manual iterator using JavaScript iterator protocol
// ---------------------------------------------------------------------------

function createArrayIterator(arr) {
    let idx = 0;

    return {
        next() {
            if (idx < arr.length) {
                const result = {
                    value: arr[idx],
                    done: false
                };

                idx++;
                return result;
            }

            return {
                value: undefined,
                done: true
            };
        }
    };
}

const iterator = createArrayIterator(["a", "b", "c"]);

console.log("\nProper iterator:");
console.log(iterator.next()); // { value: 'a', done: false }
console.log(iterator.next()); // { value: 'b', done: false }
console.log(iterator.next()); // { value: 'c', done: false }
console.log(iterator.next()); // { value: undefined, done: true }

/*
    This follows the iterator protocol.
    But it is still only an iterator, not an iterable.
    That means this will NOT work yet:

    for (const item of createArrayIterator(["a", "b", "c"])) {
        console.log(item);
    }

    Why?
    Because for...of needs an iterable, and an iterable must have
    [Symbol.iterator]().
*/

// ---------------------------------------------------------------------------
// 3. Custom iterable object
// ---------------------------------------------------------------------------

const customIterable = {
    values: [10, 20, 30],

    [Symbol.iterator]() {
        let idx = 0;
        const values = this.values;

        return {
            next() {
                if (idx < values.length) {
                    return {
                        value: values[idx++],
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
};

console.log("\nCustom iterable with for...of:");
for (const num of customIterable) {
    console.log(num); // 10, then 20, then 30
}

/*
    Now customIterable works with for...of because it has:

    [Symbol.iterator]() {
        return iterator;
    }

    The iterator returned from Symbol.iterator has:

    next() {
        return { value, done };
    }
*/

// ---------------------------------------------------------------------------
// 4. Built-in iterables
// ---------------------------------------------------------------------------

const arr = [100, 200, 300];
const str = "JS";
const set = new Set(["html", "css", "js"]);
const map = new Map([
    ["name", "Aditya"],
    ["language", "JavaScript"]
]);

console.log("\nBuilt-in iterables:");

for (const item of arr) {
    console.log(item);
}

for (const char of str) {
    console.log(char);
}

for (const skill of set) {
    console.log(skill);
}

for (const entry of map) {
    console.log(entry); // each entry is [key, value]
}

/*
    for...of works with all these because they are iterable.

    for...of is different from for...in:

    for...of:
        Loops over values of an iterable.
        Best for arrays, strings, maps, sets.

    for...in:
        Loops over keys/property names.
        Best for plain objects.
*/

// ---------------------------------------------------------------------------
// 5. Using iterator manually from a built-in array
// ---------------------------------------------------------------------------

const builtInIterator = [7, 8, 9][Symbol.iterator]();

console.log("\nBuilt-in array iterator manually:");
console.log(builtInIterator.next()); // { value: 7, done: false }
console.log(builtInIterator.next()); // { value: 8, done: false }
console.log(builtInIterator.next()); // { value: 9, done: false }
console.log(builtInIterator.next()); // { value: undefined, done: true }

// ---------------------------------------------------------------------------
// 6. Spread, destructuring, and Array.from use iterables
// ---------------------------------------------------------------------------

console.log("\nIterable utilities:");

const copiedValues = [...customIterable];
console.log(copiedValues); // [10, 20, 30]

const [first, second] = customIterable;
console.log(first, second); // 10 20

const convertedToArray = Array.from(customIterable);
console.log(convertedToArray); // [10, 20, 30]

/*
    These work only because customIterable has [Symbol.iterator]().
*/

// ---------------------------------------------------------------------------
// 7. Generator functions: easiest way to create iterators
// ---------------------------------------------------------------------------

function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const generatedIterator = numberGenerator();

console.log("\nGenerator manually:");
console.log(generatedIterator.next()); // { value: 1, done: false }
console.log(generatedIterator.next()); // { value: 2, done: false }
console.log(generatedIterator.next()); // { value: 3, done: false }
console.log(generatedIterator.next()); // { value: undefined, done: true }

console.log("\nGenerator with for...of:");
for (const value of numberGenerator()) {
    console.log(value);
}

/*
    function* creates a generator function.

    yield pauses the function and gives a value.
    The next next() call continues from the previous yield.

    Generators are both iterators and iterables.
    That is why they work with:
        next()
        for...of
        spread
        destructuring
        Array.from()
*/

// ---------------------------------------------------------------------------
// 8. Custom range iterable using a generator
// ---------------------------------------------------------------------------

function* range(start, end) {
    for (let current = start; current <= end; current++) {
        yield current;
    }
}

console.log("\nRange generator:");
console.log([...range(1, 5)]); // [1, 2, 3, 4, 5]

/*
    This is a useful real-world pattern.
    Instead of creating the whole array manually, the generator produces
    values one by one.
*/

// ---------------------------------------------------------------------------
// 9. Making a plain object iterable
// ---------------------------------------------------------------------------

const student = {
    name: "Aditya",
    course: "JavaScript",
    level: "Beginner to Advanced",

    *[Symbol.iterator]() {
        yield this.name;
        yield this.course;
        yield this.level;
    }
};

console.log("\nIterable object:");
for (const value of student) {
    console.log(value);
}

/*
    Plain objects are not iterable by default.
    But we can make them iterable by adding [Symbol.iterator].

    Here we used generator syntax:

    *[Symbol.iterator]() {
        yield this.name;
        yield this.course;
        yield this.level;
    }
*/

// ---------------------------------------------------------------------------
// 10. Common mistakes
// ---------------------------------------------------------------------------

/*
    Mistake 1:
    Returning only a value from next().

    next() should return:
        { value: something, done: false }

    Mistake 2:
    Forgetting done: true.

    If done never becomes true, loops may never stop.

    Mistake 3:
    Thinking every iterator is automatically iterable.

    An iterator has:
        next()

    An iterable has:
        [Symbol.iterator]()

    Mistake 4:
    Using for...of on a plain object.

    Use Object.keys(), Object.values(), Object.entries(), or define
    [Symbol.iterator] manually.
*/

// ---------------------------------------------------------------------------
// 11. Quick summary
// ---------------------------------------------------------------------------

/*
    Iterator:
        Object with next().

    next():
        Returns { value, done }.

    Iterable:
        Object with [Symbol.iterator]().

    for...of:
        Automatically calls [Symbol.iterator]() and then keeps calling next().

    Generator:
        A simpler way to create iterators using function* and yield.

    Manual iterator:
        Best for learning and custom control.

    Generator iterator:
        Best for clean, readable iterator code.
*/
