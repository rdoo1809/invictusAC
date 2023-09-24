// import the dependencies
const express = require('express');
const path = require('path');
var myApp = express();

// set up views and public folders
myApp.set('views', path.join(__dirname, 'views'));
myApp.use(express.static(__dirname+'/public'));
myApp.set('view engine', 'ejs');

//
myApp.get('/', function(req, res){
res.render('home'); // no need to add .ejs to the file name
});


//listens on this port
myApp.listen(3000);
console.log("Up and at 'em at localhost 3000")