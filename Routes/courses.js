const { Router } = require("express");
const courseRouter = Router();

courseRouter.get("/preview", (req, res) => {
  res.send("1");
});
courseRouter.post("/purchase", (req, res) => {
  res.send("1");
});

module.exports = {
  courseRouter: courseRouter,
};
