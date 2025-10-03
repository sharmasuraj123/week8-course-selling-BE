// const express = require('express')
// const Router = express.Router;

const { Router } = require("express");
const userRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
const { usermodel } = require("../db");
const { signupSchema } = require("../zod");

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
userRouter.get("/purchases", (req, res) => {
  res.json({ mess: "hello man!" });
});

module.exports = {
  userRouter: userRouter,
};
