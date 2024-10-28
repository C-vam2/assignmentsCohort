//  start writing your code from here
const express = require("express");
const { ToDoModel } = require("../db/index");
const authMiddleware = require("../middleware/user");

const router = express.Router();
router.use(authMiddleware);
router.post("/addToDo", async (req, res, next) => {
  try {
    const title = req.body.title;
    await ToDoModel.create({
      userId: req.userId,
      title: title,
    });
    res.json({ msg: "Todo added successfully!" });
  } catch (error) {
    res
      .status(401)
      .json({ msg: "Some error occured while adding todos, Try again!!" });
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.userId;
    const responseData = await ToDoModel.find({ userId: userId });
    res.json({ todos: responseData });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Unable to fetch data !" });
  }
});

module.exports = router;
