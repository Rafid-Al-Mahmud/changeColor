const express = require("express");
const app = express();
const HOSTNAME = "192.168.0.102";
const PORT = process.env.PORT || 8080;
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
    <style>
      *{
        background-image: url('https://i.pinimg.com/originals/2e/9c/68/2e9c6878eae5bbcdaa2d07ed4dbd79b8.gif');
        background-position: center;
        background-attachment: fixed;
        background-size: 50%;
        background-repeat: no-repeat;
        background-color: #222222;
      }
@media only screen and (max-width: 600px) {
  * {
    background-size: 100%;
  }
}
    </style>
  <h2>BG: ${bg}</h2>
  <script>/*location.replface("https://rafid.up.railway.app/register")*/history.back();</script>
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

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOSTNAME}:${PORT}`);
});
