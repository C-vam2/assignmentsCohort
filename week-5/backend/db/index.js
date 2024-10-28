//  start writing from here
const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: { type: String, unique: true },
});

const toDoSchema = new mongoose.Schema({
  title: String,
  done: { type: Boolean, default: false },
  userId: String,
});

const UserModel = mongoose.model("UserModel", userSchema);
const ToDoModel = mongoose.model("ToDoModel", toDoSchema);
module.exports = { UserModel, ToDoModel, connectToDB };
