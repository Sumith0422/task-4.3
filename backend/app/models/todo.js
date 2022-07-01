const mongoose = require("mongoose");

// todo model
const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    status: {
      type: [
        {
          type: String,
          enum: ["pending", "inprogress", "completed"],
        },
      ],
      default: ["pending"],
    },
    created_date: {
      type: String,
      // default: Date.now,
    },
    User: {
      type: String
    }
  })
);

module.exports = Todo;
