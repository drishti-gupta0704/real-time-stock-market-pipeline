
const Queue = require("bull");

const stockQueue = new Queue("stock-processing", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

module.exports = stockQueue;