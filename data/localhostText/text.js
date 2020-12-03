const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const url = "mongodb+srv://shweezzy:19961101@pravda.0jfpq.mongodb.net/news?retryWrites=true&w" +
        "=majority";
const userScheme = new Schema({
    _id: Object,
    title: String,
    addTime: String,
    link: String,
    publicationDate: String,
    dateOfParsing: String,
    previousDate: String,
    text: String
});
const Text = mongoose.model("Text", userScheme, 'april');

module.exports = Text;