//import dependencies
const express = require('express');
const path = require('path');

//setup global variable
var myApp = express();

const {check, validationResult} = require('express-validator');

// set up the DB connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/awesomeDb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//set up the model for the order
const Order = mongoose.model('Order',{
    name: String,
    email: String,
    phone: String,
    postcode : String,
    lunch: String,
    tickets : Number,
    campus : String,
    subTotal : Number,
    tax : Number,
    total : Number
});


myApp.use(express.urlencoded({extended:false}));

myApp.set('views', path.join(__dirname, 'views'));

myApp.use(express.static(__dirname +'/public'))

myApp.set('view engine', 'ejs');

myApp.get('/', function(req,res){
    // res.send("Helllo World");/
    res.render('form');
});

myApp.post('/', [
    check('name', 'Must have a name').notEmpty(),
    check('email', 'Must have email').isEmail()
], function(req,res){

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // console.log(errors);
        res.render('form', {
            errors : errors.array()
        });
    }
    else
    {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var postcode = req.body.postcode;
    var lunch = req.body.lunch;
    var tickets = req.body.tickets;
    var campus = req.body.campus;

    var subTotal = tickets * 20;

    if(lunch == 'yes'){
        subTotal += 15;
    }
    var tax = subTotal * 0.13;
    var total = subTotal + tax;

    var pageData = {
            name: name,
            email : email,
            phoneNumber : phone,
            postcode : postcode,
            lunch: lunch,
            tickets : tickets,
            campus : campus,
            subTotal : subTotal,
            tax : tax,
            total : total
    }

    //create an object for the model Order
    var myOrder = new Order(pageData);
    //save the order
    myOrder.save().then(function(){
        console.log('New order created');
    });

    res.render('form', pageData);
    }
});

//author page
myApp.get('/author', function(req,res){
    res.render('author', {
        name : 'Jasveen',
        studentNumber : '123123'
    });
});

myApp.listen(4500, function(){
    console.log("Application started and listening on port 4500");
});