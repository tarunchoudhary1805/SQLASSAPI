const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: {
    type: String,
  },
  rollNumber: {
    type: String,
  },
  Questions: [
    {
      question: { type: String },
      source: { type: String },
      solution: { type: String },
    }
  ],
  email: {
    type: String,
  },
});

module.exports = mongoose.model("user",User);