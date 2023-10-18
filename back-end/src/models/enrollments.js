const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator");

const enrollmentSchema = new mongoose.Schema(
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
    enrollment_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;
