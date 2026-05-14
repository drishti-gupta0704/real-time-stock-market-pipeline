
const cron = require("node-cron");

const stockQueue = require("../queues/stockQueue");

const stocks = ["AAPL", "TSLA", "MSFT"];

cron.schedule("*/5 * * * *", async () => {
  console.log(" Running Stock Cron Job");

  for (const symbol of stocks) {
    await stockQueue.add(
      { symbol },
      {
        attempts: 3,
        backoff: 5000,
      }
    );

    console.log(` Job Added: ${symbol}`);
  }
});

module.exports = cron;