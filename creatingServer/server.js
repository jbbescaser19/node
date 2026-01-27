import http from "http";
import fs from "fs";
//creates a web server that can receive requests and send responses.
//req = request what browser send to the server
//res = response what server sends back to browser
const server = http.createServer((req, res) => {
  //Tell the client that the response is OK (HTTP 200).
  res.statusCode = 200;
  //Tell the browser that the response we are sending is HTML.
  res.setHeader("Content-Type", "text/html");

  //Read the file header.html. When done, run this function: if there’s an error, error will have it; if it worked, data will have the file’s content.
  fs.readFile("./header.html", (error, data) => {
    if (error) {
      //“Tell the client that the page or resource was not found (HTTP 404).”
      res.statusCode = 404;
      //Send the text 'Error: File not found' to the browser.
      res.write("Error: File not found");
    } else {
      //“Send the content stored in data to the browser.”
      res.write(data);
    }
  });
});
//Start the server on port 3000. When it’s ready, run this function.
server.listen(3000, () => {
  console.log("server is listening on port 3000");
});
