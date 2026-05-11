
const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      index: true,
    },

    timestamp: {
      type: String,
      required: true,
    },

    open: Number,
    high: Number,
    low: Number,
    price: Number,
    volume: Number,

    previousClose: Number,
    change: Number,
    changePercent: Number,
  },
  { timestamps: true }
);

stockSchema.index({ symbol: 1, timestamp: 1 }, { unique: true });

module.exports = mongoose.model("Stock", stockSchema);