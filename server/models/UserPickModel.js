const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userPicksSchema = new mongoose.Schema(
  {
    picks: {
      type: Array,
    },
    user: {
      type: ObjectId,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const UserPicks = mongoose.model("picks", userPicksSchema);

module.exports = UserPicks;