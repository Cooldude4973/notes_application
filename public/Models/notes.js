const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/notes");

var notesSchema = mongoose.Schema({
    name : String,
    text : String
});

module.exports = mongoose.model('notes', notesSchema);


