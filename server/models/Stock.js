const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
  tikr: {
    type: String,
    maxlength: 10,
  },
});



const Stock = mongoose.model("Stock", stockSchema);

module.exports = { Stock };
