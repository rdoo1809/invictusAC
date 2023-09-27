const express = require('express');
var myApp = express();

myApp.get('/', function(req, res){
    res.send("Helllo World");
});

myApp.listen(3000, function(){
    console.log("Application started and listening on port 3000");
});