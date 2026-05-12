
const Redis = require("ioredis");

const redis = new Redis();

redis.on("connect", () => {
  console.log(" Redis Connected");
});

redis.on("error", (err) => {
  console.log(" Redis Error:", err.message);
});

module.exports = redis;