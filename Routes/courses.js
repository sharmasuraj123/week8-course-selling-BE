const { Router } = require("express");
const courseRouter = Router();
const { usermiddleware } = require("../middleware/user");
const { coursemodel, purchasemodel } = require("../db");

courseRouter.get("/preview", async (req, res) => {
  const Allcourses = await coursemodel.find({}); // empty array means all the courses.
  res.json({
    courses: Allcourses,
  });
});

courseRouter.post("/purchase", usermiddleware, async (req, res) => {
  const userid = req.userid;
  try {
    const courseid  = req.body.courseid;

    // we should check the user has paid the price.
    const purchase = await purchasemodel.create({
      userId: userid,
      courseId: courseid,
    });
    res.json({
      message: "you have bought the course successfully.",
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
});

module.exports = {
  courseRouter: courseRouter,
};
