const axios = require("axios");

const GAMING_QUERY =
  '"video game" OR gaming OR "game release" OR playstation OR xbox OR nintendo OR esports';

const BANNED_WORDS = ["casino", "bet", "slot", "gambling", "bonus"];

function isNotSpam(article) {
  const text = `${article.title} ${article.description}`.toLowerCase();
  return !BANNED_WORDS.some((word) => text.includes(word));
}

const getGamingNews = async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        apiKey: process.env.NEWS_API_KEY,
        q: GAMING_QUERY,
        language: "en",
        sortBy: "publishedAt",
        pageSize: 20,
      },
    });

    const articles = (response.data.articles || [])
      .filter(isNotSpam)
      .map((a) => ({
        title: a.title,
        description: a.description,
        image: a.urlToImage,
        url: a.url,
        publishedAt: a.publishedAt,
        source: a.source?.name,
      }));

    res.json(articles);
  } catch (error) {
    console.error("NEWSAPI_ERROR:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch gaming news" });
  }
};

const getTopGames = async (req, res) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: process.env.RAWG_API_KEY,
        ordering: "-rating",
        page_size: 15,
      },
    });
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top games" });
  }
};

module.exports = { getGamingNews, getTopGames };
