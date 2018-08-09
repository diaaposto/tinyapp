// implement a function that produces a string of 6 random alphanumeric characters:
//you have an array of random characters and you need to return random combination of length n 
//lets say you have a list of 20 chars, and you need to return a list with 5 characters
//5 chars should be a random subset of that 20
//make it so you can change the 20 or 5 at a moments notice 
//if harcoded use list.length

// ALPHANUMERIC FUNCTION QUESTIONS
// Determine and discuss a couple limitations of the current approach of generating shortURL strings

// Could you recommend a better approach that avoids the existing limitations?



function generateRandomString() {
  let resultStr = '';
  let possibleOutcomes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 6; i++) {
    resultStr += possibleOutcomes.charAt(Math.floor(Math.random() * possibleOutcomes.length));
    // console.log(`generating is fun ${resultStr}`)
  }

  return resultStr;
}

console.log(generateRandomString());

const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080; // default port 8080
//every operating system runs in an environment - key/value pairs that are set
//path tells our shell where to look 

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// The body-parser library will allow us to access POST request parameters, such as req.body.longURL, which we will store in a variable called urlDatabase
//when u receive post req find the generated key and then add the long url in
//generate short url, add it to index, and then redirect
//obj[key] = value;
const urlDatabase = {
  "b2xVn2 - ": "http://www.lighthouselabs.ca",
  "9sm5xK - ": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.end("Hello!");
});

// When sending variables to an EJS template, you need to send them inside an object, 
// even if you are only sending one variable. 
// This is so you can use the key of that variable (in the above case the key is urls) 
// to access the data within your template.

//LOGIN/HOME PAGE

app.get("/urls", (req, res) => {

  let templateVars = { 
    urls: urlDatabase,
    username: req.cookies['username'] 
  };
  // console.log(templateVars);
  res.render("urls_index", templateVars);
});


app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});


app.get("/urls/:id", (req, res) => {
  
  let templateVars = { 
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id],
    username: req.cookies['username'],
   };
  console.log(templateVars);
  res.render("urls_show", templateVars);
});

app.get("/urls.json", (req, res) => {
    res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
    res.end("<html><body>Hello <b>World</b></body></html>\n");
});  

//**************************** */

// app.post("/login",  (req, res) => {
//   const {username, password} = req.body;

//   if (username && password) {
//     const user = fetchUserByUsername(username);

//     // if (user && user)
//   }
// })

// app.post("/register", (req, res) => {
//   const {username, password, password_confirm} = req.body;

//   if (username && password && password_confirm) {
//     //everything is good, try and register
//     if (password === password_confirm) {
//       const user = {
//         id: userRandomId,
//         username: username,
//         password: password
//       }

//       users.push(user);
//       res.cookie('user_id', user.id, {maxAge: 10 * 60 * 1000});
//       res.redirect("/");

//     } else {
//       console.log("Passwords do not match");
//       res.redirect("/register")
//     }


//   } else {
//     console.log("Please provide all fields: username, password and password_confirm");
//   }
// })

/**************** */

//what are we doing here?

app.post("/urls/:id", (req, res) => {
  // console.log("the content of the form:", req.body);
  urlDatabase[req.params.id] = req.body.longURL;
  // console.log(req.body);
  // console.log(req.params.id);
  res.redirect('/urls/' + req.params.id);
});


app.post("/urls/:id/delete", (req, res) => {
  // console.log(req.params.id)
  delete urlDatabase[req.params.id];
  res.redirect("/urls");
});


app.post("/urls", (req, res) => {
  console.log(req.body);
   let gnShortUrl = generateRandomString();
  //  console.log(`adding ${gnShortUrl} ... ${gnShortUrl + req.body.longURL}`)
   urlDatabase[gnShortUrl] = req.body.longURL;
   // function short url generated 
  //create a new key in database, short key, and value will be long url
  //then redirect client to shortURL page 
  // console.log(urlDatabase);  // debug statement to see POST parameters
  // res.send("Ok");
  res.redirect("/urls/" + gnShortUrl);         // Respond with 'Ok' (we will replace this)
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.cookie('username', req.body.username); 
  res.redirect('/urls');

});

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });