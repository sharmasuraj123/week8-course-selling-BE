const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorid: ObjectId,
});

const purchseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const usermodel = mongoose.model("users", userSchema);
const adminmodel = mongoose.model("admins", adminSchema);
const coursemodel = mongoose.model("courses", courseSchema);
const purchasemodel = mongoose.model("purches", purchseSchema);

module.exports = {
  usermodel: usermodel,
  adminmodel: adminmodel,
  coursemodel: coursemodel,
  purchasemodel: purchasemodel,
};
