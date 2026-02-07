const express = require("express");
const { getGamingNews, getTopGames } = require("../controllers/newsController");
const router = express.Router();

router.get("/", getGamingNews);
router.get("/top-rated", getTopGames);

module.exports = router;
