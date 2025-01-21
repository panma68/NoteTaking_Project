// Advanced JS

// 1. Understanding _this_
// 1.1 Global Context: When used in the global scope, this refers to the global object
//                     (window in browsers or global in Node.js).
// 1.2 Object Context: When used in an object method, this refers to the object the method is called on.
// 1.3 Function Context: In a regular function, this depends on how the function is called.
// 1.4 Arrow Functions: Arrow functions do not have their own this; they inherit this from their parent scope.

// Example

const person = {
    name:"Panos",
    greet(){
        console.log(`My name is ${this.name}.`);
    }
};

person.greet();

const sayHello = person.greet;
sayHello(); // On a regular function , [this] is undefined, or refers to the global object.

// 2. Closures

// A closure is a function that has access to its outer function’s scope, 
// even after the outer function has finished executing.
// This is useful for creating private variables or functions that persist.

function outerFunction(){
    var secret = 2;
    return function secretFunction(){
        console.log(secret);
    };
}

const revealSecret = outerFunction();
revealSecret();



// Practical Use Case: Closures are often used in scenarios like data privacy and callbacks.

// 3. Higher-Order Functions

// A higher-order function is a function that takes another function as an argument or returns a function.
// Common examples: map, filter, and reduce.

// Example.

const numbers = [1,2,3,4,5];
const doubled = numbers.map(num => num * 2);

console.log(numbers); // Output as a list/array.
console.log(...numbers); // "Unbox" from list/array.

console.log(doubled);

// 4. Important ES6+ features.

// Template literals: (for strings)
// basically ${name} with `` (NOT "",or '', but ``).
const name = "Panos";
console.log(`My name is ${name}`);

// Destructuring: Extract values from
// arrays or objects easily. 

const user = {nameU: "Panos", ageU: 23};
const {nameU, ageU} = user; 
// take values of user, and assign them to new vars,
// name1 and age1. MUST HAVE SAME VALUES!
console.log(nameU, ageU);

// Spead and Rest operators

// Spread Expands the array..
const nums = [1, 2, 3];
const newNums = [...nums, 4, 5];

console.log(newNums);

// Rest: Collects multiple elements into an array.

function sum(...args){
    return args.reduce((acc, val) => acc + val, 0);
}

console.log(sum(1,2,5,8));

// Example
// - Create a closure that keeps track of a counter and has methods 
// to increment, decrement, and get the current value.


//Here we create a const , and make it equal to a function.
//this way we will create a private variable inside the function,
//that will not be able to access without using the const var.
const counter_method = function(){
    //This will not run every time we run the function.
    //Here is like instanciating it for the first time.
    //Changes happen in the second function we return!
    let counter = 0;

    return function getCurrentValue(arg){
        switch (arg){
            case "increment":
                return ++counter;

            case "decrement":
                return --counter;
            
            default:
                return counter;
            }
    }
}
method1 = counter_method();

console.log(method1());//0
method1("increment");
method1("increment");
console.log(method1());
method1("decrement");
method1("decrement");
method1("decrement");
method1("decrement");
console.log(method1());

// Use map, filter, and reduce to transform an array of numbers:
// - Double each number using map.
// - Filter out numbers less than 10.
// - Calculate the sum of the remaining numbers using reduce

//Double array results
let array1 = [1,2,6,4,6];
array1 = array1.map(n => {
    return n*2
});
console.log(array1);

//Filter lessThan10 results from array
// function lessThan10(value){
//     if (value < 10){
//         return value;
//     }
// }
// array1 = array1.filter(lessThan10);
// or
array1 = array1.filter(n =>{
    if (n < 10){
        return n;
    }
});
console.log(array1);


// Sum array elements and return result.

// function sumArray(arr){
//     let sumResult = 0;

//     for(let n of arr){
//         sumResult += n;
//     }
//     return sumResult;
// }


// .reduce function
// ---------------------------------------------
// array.reduce((accumulator, currentValue) => {
//     // Function logic
//   }, initialValue);
// ---------------------------------------------
// The above, or:
array1 = array1.reduce((accumulator, currentVal) =>{
    return accumulator + currentVal;
}, 0);
console.log(array1);

// so, here what happens:
// accumulator, has starting value (optional) of 0, (initialValue).
// for each element in the array1:
    // we add accumulator(0) and the element of the array1.
    // We do that for all the elements of the array.
    // then we return the result.

const cart = [
    { item: "Book", price: 10 },
    { item: "Pen", price: 2 },
    { item: "Notebook", price: 5 }
  ];
  
  const totalPrice = cart.reduce((total, product) =>{
    return total + product.price;
    }, 0);

console.log(totalPrice);