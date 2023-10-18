const express = require("express");
const Workshop = require("../models/workshop");
const Enrollment = require("../models/enrollments");
const auth = require("../middleware/auth");

const router = new express.Router();

/// ENROLL FOR A WORKSHOP
router.post("/enroll/:workshopId" /*, auth*/, async (req, res) => {
  // const dateJSON = await Workshop.findById(req.params.workshopId);
  // const date = JSON.parse(dateJSON).enrollment_date;
  const user = JSON.parse(req.body.user);
  const enrollment = new Enrollment({
    user_id: user._id,
    workshop_id: req.params.workshopId,
    enrollment_date: Date.now(),
  });
  const match = await Enrollment.find({ workshop_id: req.params.workshopId });
  //console.log(match);
  try {
    if (match == [])
      throw new Error("You've already enrolled for this course!");
    await enrollment.save();
    console.log(user.enrollments);
    user.enrollments = [user.enrollments, enrollment]; //.push(enrollment);
    //console.log(enrollment);
    res.status(201).send(enrollment);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

/// GET ALL ENROLLMENTS
router.get("/myworkshops/:userId", async (req, res) => {
  const enrollments = await Enrollment.find({ user_id: req.params.userId });
  let workshops = [];

  for (i = 0; i < enrollments.length; i++) {
    const workshop = await Workshop.findById(enrollments[i].workshop_id);
    workshops.push(workshop);
  }

  try {
    // await req.user
    //   .populate({
    //     path: "enrollments",
    //     match: {
    //       completion: false,
    //     },
    //   })
    //   .execPopulate();
    //console.log(workshops);
    res.send(workshops);
  } catch (e) {
    ///console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
