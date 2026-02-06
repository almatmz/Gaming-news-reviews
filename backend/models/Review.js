const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    gameTitle: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("Review", reviewSchema);
