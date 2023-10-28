const express = require("express");
const Workshop = require("../models/workshop");
const auth = require("../middleware/auth");

const router = new express.Router();

/// CREATE WORKSHOP
router.post("/workshops/new", auth, async (req, res) => {
  try {
    const match = await Workshop.find({
      title: req.body.title,
      // description: req.body.description,
      // instructor_name: req.body.instructor_name,
      // date: req.body.date,
      // capacity: req.body.capacity,
    });
    const workshop = new Workshop({
      ...req.body,
    });

    if (match.length !== 0) {
      throw {
        error: {
          title: "Workshop already exists",
          msg: "Try creating a different one",
          match,
        },
      };
    }
    if (req.user.role !== "admin")
      throw {
        error: {
          title: "Not authorized!",
          msg: "Need an admin account!",
        },
      };

    await workshop.save();
    res.status(201).send(workshop);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

/// GET ALL WORKSHOPS
router.get("/workshops/", auth, async (req, res) => {
  try {
    const workshops = await Workshop.find({});

    res.send(workshops);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

/// GET WORKSHOPS WITH SEARCH PROMPT
router.get("/workshops/:searchPrompt", auth, async (req, res) => {
  try {
    const workshops = await Workshop.find({});

    const rWorkshops = workshops.filter((workshop) => {
      return workshop.title
        .toLowerCase()
        .includes(req.params.searchPrompt.toLowerCase());
    });

    res.send(rWorkshops);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

/// GET ALL USER WORKSHOPS
router.get("/user/workshops", auth, async (req, res) => {
  const workshops = await Workshop.find({});

  try {
    res.send(workshops);
  } catch (e) {
    res.status(500).send(e);
  }
});

/// GET SINGLE WORKSHOP
router.get("/workshop/:id", auth, async (req, res) => {
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

module.exports = router;
