//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();
const app = express();

app.use(express.json());

const secret = process.env.JWT_SECRET; // This should be in an environment variable in a real application
const port = process.env.PORT;

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  // userSchema here
  userName: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
});

const adminSchema = new mongoose.Schema({
  // adminSchema here
  userName: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: true },
  courses: [{ type: mongoose.Schema.ObjectId }],
});

const courseSchema = new mongoose.Schema({
  // courseSchema here
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  duration: { type: String, required: true },
  userId: mongoose.Schema.ObjectId,
});

// Define mongoose models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

const authMiddlewareAdmin = (req, res, next) => {
  //  authMiddleware logic here
  try {
    const token = req.body.token;
    if (!token) {
      res.status(401).json({ msg: "token not found" });
      return;
    }
    const response = jwt.verify(token, JWT_SECRET);
    if (response.isAdmin) {
      req.userId = response.id;

      next();
    } else {
      res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json({ msg: "Unauthorized" });
  }
};

const authMiddlewareUser = (req, res, next) => {
  //  authMiddleware logic here
  try {
    const token = req.body.token;
    if (!token) {
      res.status(401).json({ msg: "token not found" });
      return;
    }
    const response = jwt.verify(token, JWT_SECRET);
    req.userId = response.id;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Unauthorized" });
  }
};

// Connect to MongoDB
mongoose.connect("<YourMongoDbConnectionString>");

// Admin routes
app.post("/admin/signup", async (req, res) => {
  // logic to sign up admin
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userName = req.body.userName;

    const hash = await bcrypt.hash(password, 10);

    const response = await Admin.create({
      userName,
      password: hash,
      email,
    });

    res.json({ msg: "SignUp successful! Login to continue." });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Some error occured!! while signing up" });
  }
});

app.post("/admin/login", async (req, res) => {
  // logic to log in admin
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Admin.find({ email: email });
    if (!user) {
      return res.status(401).json({ msg: "User not found!!" });
    }
    const matched = await bcrypt.compare(password, user.password);

    if (matched) {
      const token = jwt.sign({ id: user._id, isAdmin: true }, JWT_SECRET);
      res.json({ msg: "Login successful!", token });
    } else {
      res.status(401).json({ msg: "Invalid credentials!." });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Some error occured while logging in." });
  }
});

app.post("/admin/courses", authMiddlewareAdmin, async (req, res) => {
  // logic to create a course
  try {
    const title = req.body.title;
    const description = req.body.description;
    const instructor = req.body.instructor;
    const duration = req.body.duration;

    const course = await Course.create({
      title,
      description,
      instructor,
      duration,
      userId: req.userId,
    });
    if (!course) {
      return res.status(401).json({ msg: "Unable to add the course" });
    } else {
      res.json({ msg: "Course added successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Some error occured while adding course" });
  }
});

app.put("/admin/courses/:courseId", authMiddlewareAdmin, (req, res) => {
  // logic to edit a course
  try {
    const id = req.params.courseId;
    const title = req.body.title;
    const description = req.body.description;
    const instructor = req.body.instructor;
    const duration = req.body.duration;

    const response = Course.findOneAndUpdate(
      { _id: id },
      { title, description, instructor, duration, userId: req.userId }
    );

    if (!response) {
      return res.status(401).json({ msg: "Unable to update the course" });
    } else {
      res.json({ msg: "Course updated successfully!" });
    }
  } catch (error) {}
});

app.get("/admin/courses", authMiddlewareAdmin, async (req, res) => {
  // logic to get all courses
  try {
    const courses = await Course.find({ userId: req.userId });
    if (!courses) {
      res
        .status(401)
        .json({ msg: "Some error occured while getting all the courses" });
    } else {
      res.json({ courses });
    }
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ msg: "Some error occured while getting all the courses" });
  }
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
});

app.post("/users/login", (req, res) => {
  // logic to log in user
});

app.get("/users/courses", (req, res) => {
  // logic to list all courses
});

app.post("/users/courses/:courseId", (req, res) => {
  // logic to purchase a course
});

app.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
});

app.listen(port, () => {
  console.log("Server is listening on port 3000");
});
