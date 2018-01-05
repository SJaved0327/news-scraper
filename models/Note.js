// * Create Note model
var mongoose = require("mongoose");

//Schema constructor
var Schema = mongoose.Schema;

//Create NoteSchema object through Schema constructor
var NoteSchema = new Schema({
	//title
	title: String,
	//body of text
	body: String
});

//Create Note model based on schema
var Note = mongoose.model("Note", NoteSchema);

// * Export Note model
module.exports = Note;