// implement a function that produces a string of 6 random alphanumeric characters:
//you have an array of random characters and you need to return random combination of length n 
//lets say you have a list of 20 chars, and you need to return a list with 5 characters
//5 chars should be a random subset of that 20
//make it so you can change the 20 or 5 at a moments notice 
//if harcoded use list.length

function generateRandomString() {
  let resultStr = '';
  let possibleOutcomes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 6; i++) {
    resultStr += possibleOutcomes.charAt(Math.floor(Math.random() * possibleOutcomes.length));
  }

  return resultStr;
}

console.log(generateRandomString());

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8080; // default port 8080

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// The body-parser library will allow us to access POST request parameters, such as req.body.longURL, which we will store in a variable called urlDatabase

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.end("Hello!");
});

// When sending variables to an EJS template, you need to send them inside an object, 
// even if you are only sending one variable. 
// This is so you can use the key of that variable (in the above case the key is urls) 
// to access the data within your template.

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {
  
  let templateVars = { 
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id]
   };
  // console.log(req);
  res.render("urls_show", templateVars);
});

app.get("/urls.json", (req, res) => {
    res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
    res.end("<html><body>Hello <b>World</b></body></html>\n");
});  

app.post("/urls", (req, res) => {
  console.log(req.body);  // debug statement to see POST parameters
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });