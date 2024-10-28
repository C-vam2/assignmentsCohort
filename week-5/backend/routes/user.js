//  start writing your code from here
const express = require("express");
const { UserModel } = require("../db/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

//SignUp middleware
router.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userName = req.body.userName;

  let hashedPassword;
  hashedPassword = await bcrypt.hash(password, 10);
  console.log("hello");
  if (hashedPassword != null) {
    await UserModel.create({
      email: email,
      password: hashedPassword,
      userName: userName,
    });

    res.json({ msg: "Congrats you are signed Up." });
    return;
  }

  res.status(500).json({ msg: "Some error occured!" });
});

//SignIn middleware
router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({ email: email });

  if (user) {
    const userPassword = user.password;
    console.log(user);
    const match = await bcrypt.compare(password, userPassword);
    console.log(match);
    if (match) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      res.json({ token: token });
      return;
    }
    res.status(401).json({ msg: "Invalid credentials" });
  } else {
    res.status(401).json({ msg: "User does not exist!!" });
  }
});

module.exports = router;
