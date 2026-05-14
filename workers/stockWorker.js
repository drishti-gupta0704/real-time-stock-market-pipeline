
const stockQueue = require("../queues/stockQueue");

const { fetchStockData } = require("../services/stockService");
const transformStockData = require("../utils/transformStockData");
const Stock = require("../models/Stock");

stockQueue.process(async (job) => {
  try {
    const { symbol } = job.data;

    console.log(` Processing Stock: ${symbol}`);

    const apiData = await fetchStockData(symbol);

    const transformed = transformStockData(symbol, apiData);

    if (!transformed) {
      throw new Error("Invalid stock data");
    }

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

    console.log(" Stock Saved:", stock.symbol);

    return stock;

  } catch (error) {
    console.log(" Worker Error:", error.message);

    throw error;
  }
});