const { Router } = require("express");
const courseRouter = Router()
courseRouter.get("/preview", (req, res) => {});
courseRouter.post("/purchse", (req, res) => {});

module.exports = {
  courseRouter: courseRouter,
};
