// Import the built-in HTTP module to create a web server
import http from "http";

// Import the built-in File System module to read files
import fs from "fs";

// Create a server and define what happens when a request comes in
const server = http.createServer((req, res) => {
  // Start with the base folder where HTML files are stored
  let path = "./views/";

  // Routing: check the requested URL and decide which file or action to take
  switch (req.url) {
    case "/": // If the URL is "/" (home page)
      // Set the response header: 200 OK + tell browser content is HTML
      res.writeHead(200, { "Content-Type": "text/html" });
      // Specify the file to send for home page
      path += "index.html";
      break; // stop this case and continue after switch

    case "/about": // If the URL is "/about"
      // Set response header: 200 OK + HTML content
      res.writeHead(200, { "Content-Type": "text/html" });
      // Specify the file to send for about page
      path += "about.html";
      break; // stop this case

    case "/about-me": // If the URL is "/about-me"
      // Redirect the browser to "/about" with 301 Moved Permanently
      res.writeHead(301, { Location: "/about" });
      // End the response immediately because no file is sent
      res.end();
      // Stop the function so it doesn't continue to read a file
      return;

    default: // If URL doesn't match any case
      // Send 404 Not Found header + HTML content
      res.writeHead(404, { "Content-Type": "text/html" });
      // Specify the 404 page file
      path += "404.html";
      break; // stop default case
  }

  // Read the file from the file system
  fs.readFile(path, (err, data) => {
    if (err) {
      // If file not found or error reading, send 404 status
      res.statusCode = 404;
      // Send error message to browser
      res.write("Error: File not found");
    } else {
      // If file is found, send the file content
      res.write(data);
    }
    // End the response (required for the browser to know it's finished)
    res.end();
  });
});

// Tell the server to listen on port 3000
server.listen(3000, () => {
  // Log to console that server is running
  console.log("server is running on port 3000");
});
