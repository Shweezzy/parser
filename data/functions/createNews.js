const News = require("../schemas/newNews");

module.exports = async (req, res) => {
  try {
    let {
      title,
      addTime,
      link,
      publicationDate,
      dateOfParsing,
      previousDate,
      text,
    } = req.body;

    let newNews = new News({
      title,
      addTime,
      link,
      publicationDate,
      dateOfParsing,
      previousDate,
      text,
    });

    await newNews.save();

    res.json("news is added");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error.");
  }
};
