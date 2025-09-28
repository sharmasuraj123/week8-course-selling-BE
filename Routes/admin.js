const { Router } = require("express");
adminRouter = Router();

adminRouter.post("/signup", (req, res) => {});
adminRouter.post("/login", (req, res) => {});
adminRouter.post("/course", (req, res) => {});
adminRouter.put("/course", (req, res) => {});
adminRouter.get("/course/bulk", (req, res) => {});

module.exports = {
  adminRouter: this.adminRouter,
};
