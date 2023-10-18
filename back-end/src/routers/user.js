const express = require("express");
const { findById } = require("../models/user");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

/// REGISTER
router.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(req.body);
    console.log(e);
    res.status(400).send(e);
  }
});

/// LOG IN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
    //console.log({ user, token });
  } catch (e) {
    //console.log(req.body);
    //console.log(e);
    res.status(400).send();
  }
});

/// LOG OUT
router.post("/logout", async (req, res) => {
  try {
    const user = await User.findById(req.body.user._id);
    user.tokens = user.tokens.filter((token) => {
      return token.token != req.body.token;
    });
    await user.save();
    res.send();
  } catch (e) {
    res.sendStatus(500).send();
  }
});

module.exports = router;
