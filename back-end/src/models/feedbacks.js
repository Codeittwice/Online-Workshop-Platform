const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator");

const feedbackSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: "User",
    },
    workshop_id: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: "Workshop",
    },
    workshop_title: {
      type: String,
      required: false,
      trim: true,
    },
    user_name: {
      type: String,
      required: false,
      trim: true,
    },
    feedback_text: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      // type: RATINGS,
      // required: true,
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
