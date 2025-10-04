const { Router } = require("express");
const bcrypt = require("bcrypt");
adminRouter = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
const { adminmodel, coursemodel } = require("../db");
const { signupSchema } = require("../zod");
const { encodeAsync } = require("zod");
const { adminmiddleware } = require("../middleware/admin");
const admin = require("../middleware/admin");

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
        const token = jwt.sign({ adminid: admin._id }, JWT_ADMIN_SECRET);
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

// web saas project in 6 hours on youtube to learn upload image file to the db.
adminRouter.post("/course", adminmiddleware, async (req, res) => {
  const adminId = req.adminid;
  try {
    const { title, description, price, imageUrl } = req.body;
    const course = await coursemodel.create({
      title: title,
      description: description,
      price: price,
      imageUrl: imageUrl,
      creatorid: adminId,
    });
    console.log(course);
    res.json({
      message: "course added successfully.",
      courseid: course._id,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
});

adminRouter.put("/course", adminmiddleware, async (req, res) => {
  const adminId = req.adminid;
  const { title, description, price, imageUrl, courseid } = req.body;
  try {
    const course = await coursemodel.updateOne(
      {
        _id: courseid,
        creatorid: adminId,
      },
      {
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorid: adminId,
      }
    );
    res.json({
      message: "course is updated.",
      courseid: course._id,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

adminRouter.get("/course/bulk", adminmiddleware, async (req, res) => {
  const adminId = req.adminid;
  try {
    const courses = await coursemodel.find({
      creatorid: adminId,
    });
    res.json({
      message: "all the courses that was created by admin:",
      courses: courses,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

module.exports = {
  adminRouter: adminRouter,
};
