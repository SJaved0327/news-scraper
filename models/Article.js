// * Creates Article model 
var mongoose = require("mongoose");

// Schema constructor
var Schema = mongoos.Schema;

// ArticleSchema object created through Schema constructor
var ArticleSchema = new Schema ({
  //title
  title: {
    type: String,
    required: true
  },
  //link
  link: {
    type: String,
    required: true
  },
  //summary
  summary: {
    type: String,
    required: true
  }
  //note
  //model to be nested within Article model
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Article model created from ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// * Exports Article model
module.exports = Article;