const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dbConnection = require("./database/Schema");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
var secret = "azhar";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/src/index.html");
});

app.get("/api/hello", (req, res) => {
  res.send("Hello From Express");
});

app.post("/api/world", (req, res) => {
  // console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

//////////////////////////////////////////////////////////////
//                            SignIp                         //
/////////////////////////////////////////////////////////////
app.post("/signIn", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  // NOTE: Query to get the user information
  var query = `select * from users where email =\"${email}\"`;

  // NOTE: insert post information to the database
  dbConnection.Schema.query(query, function(err, result) {
    console.log(result, "3456789ik");

    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, function(
        err,
        isMatch
      ) {
        if (isMatch) {
          var token = jwt.sign({ email: email }, secret, { expiresIn: "48h" });
          console.log("toooookeeen" + token);
          res.json({
            email: email,
            message: "User Authenticate",
            token: token
          });
        } else {
          res.send("Password not match");
        }
      });
    } else {
      res.send(err);
    }
  });
});

//////////////////////////////////////////////////////////////
//                            SignUp                         //
//////////////////////////////////////////////////////////////
app.post("/signUp", function(req, res, next) {
  var userExist = `select * from users where email =\"${req.body.email}\"`;
  // console.log(userExist, "usreee");
  dbConnection.Schema.query(userExist, function(err, result) {
    if (result) {
      console.log(result, "result");
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          var name = req.body.name;
          var email = req.body.email;
          var password = hash;

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
        }
      });
    } else {
      res.send("User already exists!");
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));