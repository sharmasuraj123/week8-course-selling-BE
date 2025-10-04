const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
function usermiddleware(req, res, next) {
  const token = req.headers.token;
  if (token) {
    const userid = jwt.verify(token, JWT_USER_SECRET); // Return id or error
    console.log(userid);
    console.log(!userid);
    if (!userid) {
      return res.json({
        message: "user is not valid user.",
      });
    } else {
      req.userid = userid.userid;
      next();
    }
  } else {
    return res.status(411).json({
      message: "invalid credentials.",
    });
  }
}

module.exports = {
  usermiddleware: usermiddleware,
};
