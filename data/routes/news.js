const express = require("express");
const router = express.Router();

const getNews = require("../functions/getNews");
const createNews = require("../functions/createNews");

router.get("/getnews", getNews);

router.post("/createNews", createNews);

module.exports = router;
