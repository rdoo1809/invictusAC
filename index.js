//import dependencies
const express = require("express");
const path = require("path");

//setup global variable
var myApp = express();



//myApp.use(express.urlencoded({ extended: false }));
myApp.set("views", path.join(__dirname, "views"));
myApp.use(express.static(__dirname + "/public"));
myApp.set("view engine", "ejs");




//render store homepage on load
myApp.get("/", function (req, res) {
  res.render("form");
});


//listen on localhost
myApp.listen(3000, function () {
  console.log("Application started and listening on port 4500");
});
