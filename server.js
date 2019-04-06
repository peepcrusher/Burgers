var express = require("express");

var PORT = process.env.port || 3000;

var app = express();

//access to public folder
app.use(express.static("public"));

//body parser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//set handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//require the controller for the routes
var routes = require("./controllers/burgers_controller.js");

console.log(routes);
app.use(routes);

//start the server
app.listen(PORT, function(){
    //console log to make sure our server has started

    console.log("Server Listening on PORT: " + PORT);
})