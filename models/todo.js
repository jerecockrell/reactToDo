var mongoose = require('mongoose');
var Schema = mongoose.Schema;  // constructor function

var ToDoSchema = new Schema({
    name: String,
    due_date: String,
    description: String,
});

module.exports = mongoose.model('ToDo', ToDoSchema);