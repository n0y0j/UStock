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
    type: Number
  },
  changePrice: {
    type: Number
  },
  volume: {
    type: Number
  }
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = { Stock };
