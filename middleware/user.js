const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

function usermiddleware(req, res, next) {
  const token = req.headers.token;
  try {
    const userid = jwt.verify(token, JWT_USER_SECRET); // Return id or error
    console.log(userid);
    console.log(!userid);
    req.userid = userid.userid;
    next();
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

module.exports = {
  usermiddleware: usermiddleware,
};
