const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator");

const workshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    instructor_name: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    // owner: {
    //   type: mongoose.Schema.Types.ObjectID,
    //   required: true,
    //   ref: "User",
    // },
  },
  {
    timestamps: true,
  }
);

workshopSchema.virtual("enrollments", {
  ref: "Enrollment",
  localField: "_id",
  foreignField: "workshop_id",
});

workshopSchema.virtual("feedbacks", {
  ref: "Feedback",
  localField: "_id",
  foreignField: "workshop_id",
});

const Workshop = mongoose.model("Workshop", workshopSchema);

module.exports = Workshop;
