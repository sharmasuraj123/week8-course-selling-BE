// const express = require('express')
// const Router = express.Router;

const { Router } = require("express");
const userRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
const { usermodel, purchasemodel, coursemodel } = require("../db");
const { signupSchema } = require("../zod");
const { usermiddleware } = require("../middleware/user");

userRouter.post("/signup", async (req, res) => {
  try {
    signupSchema.parse(req.body);
    const { email, password, firstName, lastName } = req.body;
    const findemail = await usermodel.findOne({
      email: email,
    });
    if (!findemail) {
      // bcrypting the password.
      const bcryptedpassword = await bcrypt.hash(password, 4);

      await usermodel.create({
        email: email,
        password: bcryptedpassword,
        firstName: firstName,
        lastName: lastName,
      });
      res.json({
        message: "you are signed up successfully.",
      });
    } else {
      return res.json({
        message: "email already exists.",
      });
    }
  } catch (e) {
    return res.json({
      errormessage: e.errors || e.issues || e.message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usermodel.findOne({
      email: email,
    });
    if (user) {
      const decriptedpassword = await bcrypt.compare(password, user.password);
      if (decriptedpassword) {
        const token = jwt.sign({ userid: user._id }, JWT_USER_SECRET);
        res.json({
          message: "you are logged in successfully ",
          token: token,
        });
      } else {
        return res.json({
          message: "password is incorrect.",
        });
      }
    } else {
      return res.json({
        message: "email does not exist.",
      });
    }
  } catch (e) {
    return res.status(403).json({
      message: e.message,
    });
  }
});

// To find all the courses
userRouter.get("/purchases", usermiddleware, async (req, res) => {
  const userid = req.userid;
  try {
    const usercourses = await purchasemodel.find({
      //  [{userid:"abc",courseid:""},{}]
      userId: userid,
    });
    console.log(usercourses.map((x) => x.courseId));
    const coursedata = await coursemodel.find({
      _id: { $in: usercourses.map((x) => x.courseId) },
    });
    console.log(coursedata);
    res.json({
      message: "all coureses that was bought by the user",
      courses: usercourses,
      coursedata: coursedata,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
});

module.exports = {
  userRouter: userRouter,
};
