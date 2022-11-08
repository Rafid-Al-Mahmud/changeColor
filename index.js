const express = require("express");
const app = express();
const HOSTNAME = "192.168.0.102";
const PORT = 8080;
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/test.html");
});

app.get("/data", (req, res) => {
    res.sendFile(__dirname + "/example.json");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/register", (req, res) => {
  const bg = req.body.bg;
  res.send(`
  <h2>BG: ${bg}</h2>
  <script>location.replace("http://192.168.0.102:8080/register")</script>
  `);
  let x = `
  {
    "bg": "${bg}" 
  }
  `;
  fs.writeFile('example.json', x, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});

app.listen(() => {
  console.log(`Server is running at http://${HOSTNAME}:${PORT}`);
});
