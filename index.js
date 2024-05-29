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
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end();
    }
  } else if (req.method === "POST") {
    if (req.url === "/submit") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const params = new URLSearchParams(body);
        const title = params.get("title");
        const Content = params.get("content");
        const postData = `title : ${title} Content : ${Content}`;
        fs.appendFile("post.txt", postData, (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end();
          }
        });
      });
    } else if (req.url === "/styles.css") {
      fs.readFile(path.join(__dirname, "styles.css"), (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end();
          return;
        }
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      });
    } else if (req.url === "/script.js") {
      fs.readFile(path.join(__dirname, "script.js"), (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end();
          return;
        }
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(data);
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end();
    }
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log("서버 가동");
  console.log(`http://localhost:${PORT}`);
});
