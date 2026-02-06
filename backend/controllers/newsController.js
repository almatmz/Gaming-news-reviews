const axios = require("axios");

const getGamingNews = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&ordering=-added`,
    );
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ message: "Error fetching from External API" });
  }
};

module.exports = { getGamingNews };
