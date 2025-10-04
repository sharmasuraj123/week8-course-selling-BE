const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

function adminmiddleware(req, res, next) {
  const token = req.headers.token;
  console.log(token)
    try {
      const adminid = jwt.verify(token, JWT_ADMIN_SECRET); // Return id or error
      console.log(adminid);
      console.log(!adminid);
      req.adminid = adminid.adminid;
      next();
    } catch (error) {
      return res.json({
        error: error.message,
      });
    }
  } 


module.exports = {
  adminmiddleware: adminmiddleware,
};
