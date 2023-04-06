const express = require("express");
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res, next) => {
  let newUser = req.body;
  const { email, password } = req.body;
  try {
    let data = await userModel.find({ email });
    if (data.length > 0) {
      res.send("User Already Exists, Kindly Login!");
    } else {
      bcrypt.hash(password, 2, async (err, hash) => {
        if (err) {
          next(err);
        }
        try {
          let user = new userModel({ email, password: hash });
          await user.save();
          res.send("User Registered Successfully");
        } catch (err) {
          next(err);
        }
      });
    }
  } catch (err) {
    next(err);
  }
});

userRouter.post("/login", async (req, res, next) => {
  let user = req.body;
  const { email, password } = user;
  try {
    let data = await userModel.find({ email });
    if (data.length == 0) {
      res.send("Wrong Email");
    } else {
      let match = await bcrypt.compare(password, data[0].password);
      if (match) {
        let token = jwt.sign({ id: data[0].password }, "masai");
        res.send({ msg: "User Login Successful", token });
      } else {
        res.send("Invalid Credentials");
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
