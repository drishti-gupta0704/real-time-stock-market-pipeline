
const { fetchStockData } = require("../services/stockService");

const getStockData = async (req, res) => {
  try {
    const { symbol } = req.params;

    const data = await fetchStockData(symbol);

    res.status(200).json({
      success: true,
      symbol,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStockData,
};