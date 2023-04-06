const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const aptRouter = require("./routes/appointment.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);

app.use("/apt", aptRouter);

app.use("/", (req, res) => {
  res.send("Home Route");
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
  console.log("Server started at port 8080");
});
