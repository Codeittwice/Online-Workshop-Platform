const express = require("express");
const Feedback = require("../models/feedbacks");
const auth = require("../middleware/auth");
const User = require("../models/user");
const Workshop = require("../models/workshop");

const router = new express.Router();

/// GET FEEDBACKS FOR USER
router.get("/feedbacks", auth, async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user_id: req.user._id });

    if (feedbacks == []) throw new Error("Couldn't find any workshops");

    // await req.user
    //   .populate({
    //     path: "enrollments",
    //     match: {
    //       completion: false,
    //     },
    //   })
    //   .execPopulate();
    //console.log(workshops);
    const user = req.user;
    feedbacks.map((feedback) => {
      feedback.user_name = user.name;
      return feedback;
    });
    //console.log(feedbacks);
    //feedbacks = newf;
    user.feedbacks = feedbacks;
    await user.save();
    //console.log(user.feedbacks);
    //await feedbacks.save();
    res.send(user.feedbacks);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      error: {
        title: "Couldn't find feedbacks",
        msg: "",
      },
    });
  }
});
/// GIVE FEEDBACK
router.post("/feedback/new", auth, async (req, res) => {
  try {
    //await Feedback.deleteMany({});
    const workshop = await Workshop.findById(req.body.workshop_id);
    const user = await User.findById(req.body.user_id);
    const feedback = new Feedback({
      ...req.body,
      workshop_title: workshop.title,
      user_name: user.name,
    });

    await feedback.save();

    user.feedbacks = [user.feedbacks, feedback];

    await user.save();

    res.status(201).send(feedback);
  } catch (e) {
    res.status(400).send(e);
  }
});

/// GET FEEDBACKS FOR WORKSHOP (ADMIN)
router.get("/feedbacks/:workshopId", auth, async (req, res) => {
  try {
    const feedbacks = await Feedback.find({
      workshop_id: req.params.workshopId,
    });
    if (feedbacks == []) throw new Error("Couldn't find any workshops");

    // await req.user
    //   .populate({
    //     path: "enrollments",
    //     match: {
    //       completion: false,
    //     },
    //   })
    //   .execPopulate();
    //console.log(workshops);

    res.send(feedbacks);
    //console.log(feedbacks);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      error: {
        title: "Couldn't find feedbacks",
        msg: "",
      },
    });
  }
});

module.exports = router;
