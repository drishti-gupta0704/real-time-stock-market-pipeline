
const { fetchStockData } = require("../services/stockService");
const transformStockData = require("../utils/transformStockData");
const Stock = require("../models/Stock");

const getStockData = async (req, res) => {
  try {
    const { symbol } = req.params;

    const apiData = await fetchStockData(symbol);
    const transformed = transformStockData(symbol, apiData);

    if (!transformed) {
      return res.status(400).json({
        success: false,
        message: "Invalid API response",
      });
    }

    
    try {
      const stock = await Stock.create(transformed);
    } catch (err) {
      
    }


    res.status(200).json({
      success: true,
      source: "api + db",
      data: transformed,
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