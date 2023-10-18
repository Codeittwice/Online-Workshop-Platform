const express = require("express");
const Feedback = require("../models/feedbacks");
const auth = require("../middleware/auth");

const router = new express.Router();

/// ENROLL FOR A WORKSHOP
router.post("/feedback/:workshopId", auth, async (req, res) => {
  const feedback = new Feedback({
    ...req.body,
    user_id: req.user._id,
    workshop_id: req.params.workshopId,
  });

  try {
    await feedback.save();
    res.status(201).send(feedback);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
