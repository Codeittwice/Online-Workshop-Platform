const express = require("express");
const Workshop = require("../models/workshop");
const Enrollment = require("../models/enrollments");
const auth = require("../middleware/auth");

const router = new express.Router();

/// ENROLL FOR A WORKSHOP
router.post("/enroll/:workshopId", auth, async (req, res) => {
  try {
    const user = JSON.parse(req.body.user);
    const enrollment = new Enrollment({
      user_id: user._id,
      workshop_id: req.params.workshopId,
      enrollment_date: Date.now(),
    });
    const match = await Enrollment.find({ workshop_id: req.params.workshopId });

    console.log(match != []);
    if (match != []) {
      /// DELETE IF WE HAVE MATCHES
      // const newEnrollments = await Enrollment.deleteMany({
      //   workshop_id: req.params.workshopId,
      // });
      // user.enrollments = newEnrollments;

      throw {
        error: {
          title: "You've already enrolled for this course!",
          msg: "Please try a different one!",
        },
      };
    }
    await enrollment.save();

    user.enrollments = [user.enrollments, enrollment];

    res.status(201).send(enrollment);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

/// GET ALL ENROLLMENTS
router.get("/myworkshops/:userId", auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user_id: req.params.userId });
    let workshops = [];

    for (i = 0; i < enrollments.length; i++) {
      const workshop = await Workshop.findById(enrollments[i].workshop_id);
      workshops.push(workshop);
    }
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
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
