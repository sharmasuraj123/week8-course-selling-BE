const express = require("express");
const { createuserRouter } = require("./Routes/user");
const { createcourseRoutes } = require("./Routes/courses");
const app = express();

createuserRouter(app);
createcourseRoutes(app);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
