const jwt = require("jsonwebtoken");
require("express");


function userauth(req, res, next) {
  const token = req.headers.token;
  if (token) {
    const check = jwt.verify(token, JWT_SECRET);
    console.log(check);
    console.log(!check);
    if (!check) {
      return res.json({
        message: "user is not valid user.",
      });
    } else {
      res.json({
        message: "valid request.",
      });
      next();
    }
  } else {
    return res.status(411).json({
      message: "invalid credentials.",
    });
  }
};
