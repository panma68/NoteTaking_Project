// server.js
const http = require('http');

// const server = http.createServer((req, res) => {
//   // Set the response header with a status code and content type
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
  
//   // Send a response message
//   res.end('Hello, world! Welcome to your first Node.js server!');
// });

const server = http.createServer((req, res) => {
    const url = req.url;
  
    if (url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Welcome to the Home Page!');
    
    } else if (url === '/about') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      
    // Message
      const aboutInfo = {
        message: "This is the About page",
        developer: "Panos",
        version: 1.0
      }

      res.end(JSON.stringify(aboutInfo)); // Convert object to JSON string.
    
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  });


// Define a port to listen to
const PORT = 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
