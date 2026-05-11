
const { fetchStockData } = require("../services/stockService");
const transformStockData = require("../utils/transformStockData");
const Stock = require("../models/Stock");

const getStockData = async (req, res) => {
  try {
    const { symbol } = req.params;

    const apiData = await fetchStockData(symbol);

    // console.log(" API DATA:", apiData);
    const transformed = transformStockData(symbol, apiData);
    // console.log(" TRANSFORMED:", transformed);

    if (!transformed) {
      return res.status(400).json({
        success: false,
        message: "No data to insert",
      });
    }

    // const stock = await Stock.create(transformed);
    const stock = await Stock.findOneAndUpdate(
  {
    symbol: transformed.symbol,
    timestamp: transformed.timestamp,
  },
  transformed,
  {
    upsert: true,  
    new: true,      
  }
);

    // console.log(" DB INSERT SUCCESS:", stock);
    return res.status(200).json({
      success: true,
      source: "api + db",
      data: transformed,
    });

  } catch (error) {
    console.log(" ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStockData,
};