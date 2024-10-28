// start writing from here
const express = require("express");
const cors = require("cors");
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");
const { connectToDB } = require("./db/index");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/todo", todoRouter);

connectToDB().then(
  app.listen(3000, () => {
    console.log("Server listening on port 3000...");
  })
);
