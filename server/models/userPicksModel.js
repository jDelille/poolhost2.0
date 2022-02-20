const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userPicksSchema = new mongoose.Schema(
  {
    picks: {
      type: Array,
    },
    user: {
      type: ObjectId,
      required: true,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Picks = mongoose.model("picks", userPicksSchema);

module.exports = Picks;
