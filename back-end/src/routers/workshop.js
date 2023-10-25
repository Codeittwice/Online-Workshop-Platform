const express = require("express");
const Workshop = require("../models/workshop");
const auth = require("../middleware/auth");

const router = new express.Router();

/// CREATE WORKSHOP
router.post("/workshops", auth, async (req, res) => {
  const workshop = new Workshop({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await workshop.save();
    res.status(201).send(workshop);
  } catch (e) {
    res.status(400).send(e);
  }
});
/// GET ALL WORKSHOPS
router.get("/workshops", auth, async (req, res) => {
  try {
    const workshops = await Workshop.find({});

    res.send(workshops);
  } catch (e) {
    res.status(500).send(e);
    console.log(e);
  }
});

/// GET ALL USER WORKSHOPS
router.get("/user/workshops", auth, async (req, res) => {
  const workshops = await Workshop.find({});

  try {
    // await req.user
    //   .populate({
    //     path: "tasks",
    //     match: {
    //       completion: false,
    //     },
    //   })
    //   .execPopulate();
    res.send(workshops);
  } catch (e) {
    res.status(500).send(e);
  }
});

/// GET SINGLE WORKSHOP
router.get("/workshops/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const workshop = await Workshop.findOne({ _id });

    if (!workshop) {
      return res.status(404).send();
    }

    res.send(workshop);
  } catch (e) {
    res.status(500).send(e);
  }
});

// /// UPDATE TASK
// router.patch("/tasks/:id", auth, async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["description", "completion"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates!" });
//   }

//   try {
//     const task = await Task.findOne({
//       _id: req.params.id,
//       owner: req.user._id,
//     });

//     if (!task) {
//       return res.status(404).send();
//     }

//     updates.forEach((update) => (task[update] = req.body[update]));
//     await task.save();
//     res.send(task);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// /// DELETE TASK
// router.delete("/tasks/:id", auth, async (req, res) => {
//   try {
//     const task = await Task.findOneAndDelete({
//       _id: req.params.id,
//       owner: req.user._id,
//     });

//     if (!task) {
//       return res.status(404).send();
//     }
//     res.send(task);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

module.exports = router;
