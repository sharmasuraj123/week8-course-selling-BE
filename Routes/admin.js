const { Router } = require("express");
const bcrypt = require("bcrypt");
adminRouter = Router();
const jwt = require('jsonwebtoken')
require("dotenv").config();
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
const { adminmodel } = require("../db");
const { signupSchema } = require("../zod");
const { encodeAsync } = require("zod");

adminRouter.post("/signup", async (req, res) => {
  try {
    signupSchema.parse(req.body);
    const { email, password, firstName, lastName } = req.body;
    const findemail = await adminmodel.findOne({
      email: email,
    });
    if (!findemail) {
      // bcrypting the password.
      const bcryptedpassword = await bcrypt.hash(password, 4);

      await adminmodel.create({
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

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminmodel.findOne({
      email: email,
    });
    if (admin) {
      const decriptedpassword = await bcrypt.compare(password, admin.password);
      if (decriptedpassword) {
        const token = jwt.sign({adminid:admin._id}, JWT_ADMIN_SECRET);
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

adminRouter.post("/course", (req, res) => {
  res.send("1");
});
adminRouter.put("/course", (req, res) => {
  res.send("1");
});
adminRouter.get("/course/bulk", (req, res) => {
  res.send("1");
});

module.exports = {
  adminRouter: adminRouter,
};
