//import dependencies
const express = require("express");
const path = require("path");

//setup global variable
var myApp = express();

const { check, validationResult } = require("express-validator");

// set up the DB connection
const mongoose = require("mongoose");
const { subtle } = require("crypto");
mongoose.connect("mongodb://127.0.0.1:27017/awesomeDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//set up the model for the order
const Order = mongoose.model("Order", {
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  province: String,
  petsem: String,
  smarter: String,
  supernat: String,
  prefer: String,
  subTotal: Number,
  tax: Number,
  total: Number,
});

myApp.use(express.urlencoded({ extended: false }));
myApp.set("views", path.join(__dirname, "views"));
myApp.use(express.static(__dirname + "/public"));
myApp.set("view engine", "ejs");

var phoneRegex = /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/;
//function to check a value using regular expression
function checkRegex(userInput, regex) {
  if (regex.test(userInput)) {
    return true;
  } else {
    return false;
  }
}
//phone validation function - calls regex function
function customPhoneValidation(value) {
  if (!checkRegex(value, phoneRegex)) {
    throw new Error("ERROR: Phone should be in the format xxx-xxx-xxxx");
  }
  return true;
}

//array to store provinces with tax rates
var provinces = [];
//provinces with tax rates
function ProvinceTax(provName, taxRate) {
  (this.provName = provName), (this.taxRate = taxRate);
}
provinces.push(new ProvinceTax("NL", 0.15));
provinces.push(new ProvinceTax("NS", 0.15));
provinces.push(new ProvinceTax("NB", 0.15));
provinces.push(new ProvinceTax("PE", 0.15));
provinces.push(new ProvinceTax("QC", 0.15));
provinces.push(new ProvinceTax("ON", 0.13));
provinces.push(new ProvinceTax("MB", 0.12));
provinces.push(new ProvinceTax("SK", 0.11));
provinces.push(new ProvinceTax("AB", 0.05));
provinces.push(new ProvinceTax("BC", 0.12));
provinces.push(new ProvinceTax("YU", 0.05));
provinces.push(new ProvinceTax("NU", 0.05));
provinces.push(new ProvinceTax("NT", 0.05));

//render store homepage on load
myApp.get("/", function (req, res) {
  res.render("form");
});

//form post method - collects data - makes order - saves to mongo
myApp.post(
  "/",
  [
    check("name", "ERROR: Do not leave NAME field blank").notEmpty(),
    check("email", "ERROR: Do not leave EMAIL field blank").isEmail(),
    check("phone").custom(customPhoneValidation),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("form", {
        errors: errors.array(),
      });
    } else {
      var name = req.body.name;
      var email = req.body.email;
      var phone = req.body.phone;
      var address = req.body.address;
      var city = req.body.city;
      var province = req.body.province;
      var petsem = req.body.semetary;
      var smarter = req.body.smarter;
      var supernat = req.body.supernatural;
      var prefer = req.body.prefer;
      var subTotal = petsem * 9.99 + smarter * 19.99 + supernat * 5.99;

      if (subTotal > 0) {
        //checks which province - and puts appropriate taxRate
        for (var j = 0; j < provinces.length; j++) {
          if (province == provinces[j].provName) {
            tax = provinces[j].taxRate;
            break;
          }
        }
        var tax = tax * subTotal;
        var total = subTotal + tax;

        var pageData = {
          name: name,
          email: email,
          phone: phone,
          address: address,
          city: city,
          province: province,
          petsem: petsem,
          smarter: smarter,
          supernat: supernat,
          prefer: prefer,
          subTotal: subTotal,
          tax: tax,
          total: total,
        };

        //create an object for the model Order
        var myOrder = new Order(pageData);
        //save the order
        myOrder.save().then(function () {
          console.log("New order created");
        });

        res.render("form", pageData);
      } else {
        //do nothing
      }
    }
  }
);

//render orders page
myApp.get("/allorders", function (req, res) {
  Order.find({})
    .then((orders) => {
      res.render("allorders", { orders: orders });
    })
    .catch((err) => {
      console.log("Errors :::", err);
    });
});

//listen on localhost
myApp.listen(4500, function () {
  console.log("Application started and listening on port 4500");
});
