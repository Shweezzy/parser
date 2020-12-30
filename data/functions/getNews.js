const allNews = require("../schemas/newNews");

module.exports = async (req, res) => {
  try {
    let news = await allNews.find(
      {},
      {
        _id: 0,
        addTime: 0,
        link: 0,
        publicationDate: 0,
        dateOfParsing: 0,
        previousDate: 0,
      }
    );

    res.json(news);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
