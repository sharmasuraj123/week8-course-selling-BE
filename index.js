require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const monogoURI = process.env.Mongodb_URI;

const { userRouter } = require("./Routes/user");
const { courseRouter } = require("./Routes/courses");
const { adminRouter } = require("./Routes/admin");
const app = express();

app.use("/api/v1/user", userRouter);
app.use("api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose(monogoURI);

  app.listen(3000, () => {
    console.log("server is running on port 3000");
  });
}

main();
