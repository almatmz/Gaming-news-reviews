const express = require("express");
const { getGamingNews } = require("../controllers/newsController");
const router = express.Router();

router.get("/", getGamingNews);

module.exports = router;
