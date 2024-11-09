// JS Modules.
// 1.CommonJS Modules (Node.js)

// 2. ES Modules (ESM)

// The ES Module syntax uses:
// export and import keywords,
// which are the standard in modern JavaScript.
// Creating an ES Module

// If you want to use ES Module syntax, you can rewrite mathUtils.js as:

// Creating a module
// 1
function add(a,b){
    return a+b;
}

// 2
export function mul(a,b){
    return a+b;
}


// Here we will export these functions
module.exports = {add};
    

