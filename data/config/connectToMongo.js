const mongoose = require("mongoose");
//дані, які нам надає default.json
const config = require("config");
//приєднання до нашоЇ БД, методи мангуса використовую асинхронні функції
//щоб відлавлювати можливі помилки try catch
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGDB_URL || config.get("mongoURL"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, //mongo створить унікальний індекс(пост, лайк, коммент)
    });
    console.log("MongoDb is connected...");
  } catch (err) {
    console.log(err);
    //якщо наявна помилка відключає зєднання forever
    process.exit(1);
  }
};

module.exports = connectToDB;
