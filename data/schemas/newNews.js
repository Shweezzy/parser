const mongoose = require("mongoose");

// так звані схеми, або модулі (шаблон) для БД
let News = mongoose.Schema({
  title: {
    type: String,
  },
  addTime: {
    type: String,
  },
  link: {
    type: String,
  },
  publicationDate: {
    type: String,
  },
  dateOfParsing: {
    type: String,
  },
  previousDate: {
    type: String,
  },
  text: {
    type: String,
  },
});

//кожен новий користувач буде зберігатись тут по СХЕМІ
module.exports = News = mongoose.model("allnews", News);
