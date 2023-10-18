const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./workshop");
const { USER_ROLES } = require("../enums.ts");
const Enrollment = require("./enrollments");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      //lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password shouldn\'t include "password"!');
        }
      },
    },
    role: {
      // type: USER_ROLES,
      // default: USER_ROLES.REGULAR,
      // validate(value) {
      //   if (Object.values(USER_ROLES).includes(value)) {
      //     throw new Error("Not a role");
      //   }
      // },
      type: String,
      default: "regular",
      validate(value) {
        if (!(value == "regular" || value == "admin")) {
          throw new Error("Not a role");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    // enrollments: [
    //   {
    //     enrollment: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("enrollments", {
  ref: "Enrollment",
  localField: "_id",
  foreignField: "user_id",
});
userSchema.virtual("feedbacks", {
  ref: "Feedback",
  localField: "_id",
  foreignField: "user_id",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, "workshopportal");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to log in!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to log in!");
  }

  return user;
};

/// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// ///Delete user tasks when user is deleted
// userSchema.pre("remove", async function (next) {
//   const user = this;

//   await Task.deleteMany({ owner: user._id });

//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
