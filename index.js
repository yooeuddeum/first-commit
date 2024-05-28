const http = require("http");
// console.log(http);
const fs = require("fs");
// console.log(fs);
const path = require("path");
// console.log(path);

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end();
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else {
      res.writeHead(404, {"Content-Type" : "text/plain"});
      res.end()
    }
  }
});
