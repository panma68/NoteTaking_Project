// Installing Express

// npm init -y           # Initialize a package.json file if you haven't already
// npm install express    # Install Express

// node app.js      # run the server

// app.js
const express = require('express');
const app = express();
const PORT = 3000;


// Middleware loging every path
app.use((req, res, next) => {
    console.log(`[${req.method}] request for ['${req.url}']`);
    next(); // Pass control to the next handler
  });

// Home route / page
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

  // About route with JSON response
app.get('/about', (req, res) => {

    // Like this we send JDON data
    res.json({
      message: "This is the About Page.",
      developer: "Panos",
      version: "1.0"
    });
  });

//   res.json(...) automatically converts the
//   provided object into a JSON string and sets the Content-Type header to application/json.

// Example: Route with URL Parameter
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
  });
  

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


// ------------------------------------------------------------------------------------------------

// Here , we have 3 steps:
// 1. Setting the server:
// const express = require('express');
// const app = express();
// const PORT = 3000;

// ------------------------------------------------------------------------------------------------

// 2. Setting the pages with: ('/' the home page, '/about' the about page, etc..)
// app.get('/', (req, res) => {
//     res.send('Welcome to the Home Page!');
//   });

// ------------------------------------------------------------------------------------------------

// 3. Starting the server, by listening to the port we specified:
// app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
//   });

// ------------------------------------------------------------------------------------------------

// 4. Add res.json response for the about page:
// res.json({
//     message: "This is the About Page.",
//     developer: "Panos",
//     version: "1.0"
//   });

// ------------------------------------------------------------------------------------------------

// 5. Add Middleware
// It will perform things before calls.
// Can specify if it will run before a certain path (optional).
// Order of execution: First to last (except if there is a specified path). 
// 
// app.use(path, middlewareFunction);
// 
// app.use((req, res, next) => {
//     console.log(`${req.method} request for '${req.url}'`);
//     next(); // Pass control to the next handler <---------<------------<-------!!!!!!
//   });

// ------------------------------------------------------------------------------------------------

// 6: Creating Dynamic Routes with URL Parameters

// You can also create routes with URL parameters to handle dynamic data, like user IDs or article slugs.
// Example: Route with URL Parameter

// Add a new route in app.js that responds to a dynamic :id parameter:

// app.get('/user/:id', (req, res) => {
//     const userId = req.params.id;
//     res.send(`User ID: ${userId}`);
//   });
  
// req.params:       contains route parameters defined with a colon (e.g.,     :id     ).
// req.params.id:    retrieves the value passed for     :id     in the URL. 

// ------------------------------------------------------------------------------------------------

// 7: Error Handling Middleware

// Express allows you to define error-handling middleware to catch and respond to errors in a centralized way.
// Example: Basic Error Handler

// Error-handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
//   });
  