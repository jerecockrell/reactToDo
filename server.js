// -- Call the packages needed --

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reactToDo');

var toDoRouter = require('./routes/todos');
var ToDo = require('./models/todo');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));  

app.get('/', function(req, res){
    res.render('todo', {title: "viewing the magic"});
});


var port = process.env.PORT || 3030;

var router = express.Router();


router.use(function(req, res, next){
    console.log('something is happening!');
    next();
});


router.get('/', function(req, res){
    res.json({message: "looking at reactTodo project!"});
});

// all of our routes will be prefixed with /api
app.use('/api', toDoRouter);

app.listen(port); // starts the server
console.log('magic happens on port '+ port);  // test the server