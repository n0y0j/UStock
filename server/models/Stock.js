const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
  tikr: {
    type: String,
    maxlength: 10,
  },
  name: {
    type: String,
    maxlength: 50,
  },
  exchange: {
    type: String,
    maxlength: 10,
  },
  sector: {
    type: String,
    maxlength: 50,
  },
  price: {
    type: Number
  },
  change: {
    type: Number,
  },
  changePrice: {
    type: Number
  },
  volume: {
    type: Number
  },
  marketData: [{
    date: {
      type: Date
    },
    open: {
      type: Number
    },
    high: {
      type: Number
    },
    low: {
      type: Number
    },
    close: {
      type: Number
    },
    adjClose: {
      type: Number
    },
    volume: {
      type: Number
    },
    symbol: {
      type: String
    },
  }]
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = { Stock };
