// var , function-scoped.
// let , can change, block-scoped.
// const, private variable, can not change, block-scoped.

// Types
// String, Number, Boolean, Undefined, Null, Symbol, BigInt

// Functions

// 1. Function Decleration.

function greet(name){
    return `Hello ${name}`;
}

console.log(greet("Panos"));

// 2. Function Expression.

const add = function(a,b){
    return a + b;
}

console.log(add(1,2));

// 3. Arrow Functions (ES6+).

// Same as:
// const multiply = (a,b) => a * b;
const multiply = (a,b) => {
    return a*b;
}

console.log(multiply(2,5));

// Constol Flow.
// 1. Conditionals: Classic if, if else, else.

// 2. Switch statement:
const fruit = "banana";
switch (fruit){
    case "apple":
        console.log("This is crunchy and sweet.");
        break;
    case "banana":
        console.log("This is moist and soft.");
        break;
    default:
        console.log("This is not a fruit!");
    }


// 3. Loops

// 3.1 For Loop
for (let i=0; i < 5; i++){
    console.log(i);
}

// 3.2 While Loop
let counter = 0;
while (counter < 3){
    console.log(`Counter: ${counter}.`);
    counter++;
} 

// break: exits loop prematurely.   
// continue: skips current iteration.

const checkNumber = (number) =>{
    if(number > 0){
        console.log("Positive");
    }
    else if(number < 0){
        console.log("Negative");
    }
    else{
        console.log("Zero");
    }
}

checkNumber(-2);
checkNumber(3);
checkNumber(0);


for(let i=0; i < 10; i++){
    if(i % 2 == 0){
        continue
    }
    else{
        console.log(i);
    }
}
