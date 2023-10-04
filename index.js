// import the dependencies
const express = require('express');
const path = require('path');
var myApp = express();

// set up views and public folders
myApp.set('views', path.join(__dirname, 'views'));
myApp.use(express.static(__dirname+'/public'));
myApp.set('view engine', 'ejs');


//render home
myApp.get('/', function(req, res){
res.render('home');
});

//

//


//

//


myApp.listen(3000, function(){
    console.log("Application started and listening on port 3000");
});