const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authentication").replace("Bearer ", "");
    console.log(token);
    if (token.trim() === "Bearer") {
      throw "Please log in.";
    }

    const decoded = jwt.verify(token, "workshopportal");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw "Invalid token.";
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: { title: " Unauthenticated!", msg: e } });
  }
};

module.exports = auth;
