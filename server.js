const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dbConnection = require("./database/Schema");
const jwt = require("jsonwebtoken");
var secret = "azhar";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
// app.get('/', function(req, res){
//     res.send('Hello');
//   });


app.get("/api/hello", (req, res) => {
  res.send("Hello From Express");
});

app.post("/api/world", (req, res) => {
  // console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});


// Api to add users
app.post("/user", function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  // NOTE: Query to insert the user information
  var query = `insert into users (name, email, password)
      values
      (\"${name}\",\"${email}\",\"${password}\")`;

  // NOTE: insert post information to the database
  dbConnection.Schema.query(query, function(err, result) {
    if (result) {
      var token = jwt.sign({ email: email, id: result.id }, secret, {
        expiresIn: "48h"
      });
       console.log("toooookeeen"+token)
      res.json({
        email: email,
        name: name,
        id: result.id,
        message: "User Authenticate",
        token: token
      });
    } else {
      res.send(err);
    }
  });
});

/*Sign In */
// Api to signIn
app.post("/signIn", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  // NOTE: Query to get the user information
  var query = `select * from users where email =\"${email}\" & password =\"${password}\"`;

  // NOTE: insert post information to the database
  dbConnection.Schema.query(query, function(err, result) {
    if (result) {
      var token = jwt.sign({ email: email }, secret, { expiresIn: "48h" });
      console.log("toooookeeen"+token)
      res.json({ email: email, message: "User Authenticate", token: token });
    } else {
      res.send(err);
    }
  });
});

app.post('/getUsers', (req, res) => {
  var email = req.body.email;
  console.log(req.body);
  var query = `select * from users where email =\"${email}\"`;
  dbConnection.Schema.query(query, function(err, result) {
    if (result) {
      res.send(result);
    } else {
      res.send(err);
    }
  });
})

app.get('/getUser', (req, res) => {
  var email = req.body.email;
  console.log(req.body);
  var query = `select * from users where email = 'az@gil.com'`;
  dbConnection.Schema.query(query, function(err, result) {
    if (result) {
      res.send(result);
    } else {
      res.send(err);
    }
  });
})


// if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'dist/newsApp')));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/newsApp/index.html'));
  });
// }
app.listen(port, () => console.log(`Listening on port ${port}`));
