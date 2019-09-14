var mongoose = require("mongoose");

var commentScehma = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commentScehma);