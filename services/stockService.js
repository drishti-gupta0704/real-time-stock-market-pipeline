
const axios = require("axios");

const fetchStockData = async (symbol) => {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch stock data");
  }
};

module.exports = {
  fetchStockData,
};