// 1. Callbacks
// A callback is a function passed as an argument to another function, 
// often to execute after a time-consuming operation completes.

function fetchData(callback) {
    setTimeout(() => {
      callback("Data retrieved!_1");
    }, 1000); // Simulates a 1-second delay with setTimeout.
  }
  
  fetchData((message) => {
    console.log(message); // Outputs: Data retrieved!
  });

console.log("I run first?_1");


// More on Callbacks:
function greet(name, callback) {
    console.log("Hello, " + name + "!");
    callback(name);
  }
  
  function logGreeting(name) {
    console.log(`${name} has been logged.`);
  }
  
  greet("Panos", logGreeting);

// We essentially load another function inside a function to be executed specifically
// after another code logic has been executed.

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// 2. Promises

// A Promise is an object representing a value that may not be available yet but will be resolved in the future. 
// Promises have three states:

// Pending: The initial state.
// Fulfilled: The operation completed successfully.
// Rejected: The operation failed.

// Creating and using promises:

// Structure:
// const func1 = () => {
//     return new Promise()
// }
// We just returen a Promise Object. This object must return something, so we fill it with things
// to return. 2 outcomes are possible:
// 1. Get correct result, translates as: resolve.
// 2. Get an error, translated as: reject.

const func1 = () => {
    return new Promise((resolve,reject) => {
    if(resolve){
        resolve("something");
    }
    else{
        reject("An error happened");
        }
    })
}

// And then we get the result by calling the func1 as such:
func1()
.then((response) =>{
    console.log(response);
})
.catch((error) =>{
    console.log(error);
})


const fetchData1 = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Data retrieved!_2");
      }, 2000);
    });
  };

fetchData1()
    .then((message) => console.log(message)) // Outputs: Data retrieved!
    .catch((error) => console.error(error));


// In this case, fetchData returns a Promise that resolves after one second.
// then is used to handle the successful result, while catch handles any errors.

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// 3. Async/Await (ES8)

// async/await is a more readable way to work with Promises. 
// It allows you to write asynchronous code that looks and behaves like synchronous code.

// async function: Declares a function that returns a Promise.
// await keyword: Pauses the function execution until the Promise is resolved.

const fetchData2 = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Data retrieved!_3");
      }, 2500);
    });
  };
  
  async function displayData() {
    try {
        const message = await fetchData2();
        console.log(message); // Outputs: Data retrieved!
    }  catch {
        console.log(message);
    }
}
  
displayData();

// Why Asynchronous Programming Matters in Backend Development

// In a backend context, asynchronous programming is vital because:

// Database calls, file operations, and network requests are often time-consuming.
// Asynchronous functions allow the server to handle multiple requests 
// without waiting on these operations to complete.



// Write a function called mockApiRequest that returns a Promise.
// It should resolve with "API data received!" after a 2-second delay.
// Create an async function called getData that uses await to retrieve the data from
// mockApiRequest and logs the result.

// We DONT return res. We return Promise, so the res, and everything we declare inside it
//  will be returned with it.
const mockApiRequest = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res("API data received!");
        }, 2000);
    })
}

async function getData() {
    try{
        const apiRes = await mockApiRequest();
        console.log(apiRes);
    } catch {
        console.log("Error happened while fetching mockAPI data");
    }
}

getData();