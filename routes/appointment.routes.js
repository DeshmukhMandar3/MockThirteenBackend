const express = require("express");
const aptModel = require("../model/appointment.model");

const aptRouter = express.Router();

aptRouter.post("/createapt", async (req, res, next) => {
  let apt = req.body;
  apt = { ...apt, date: Date() };
  try {
    let data = new aptModel(apt);
    await data.save();
    res.send("Appointment Created Successfully");
  } catch (err) {
    next(err);
  }
});

aptRouter.post("/bookapt", async (req, res, next) => {
  let data = req.body;
  const { aid, slots } = data;
  try {
    await aptModel.findByIdAndUpdate(aid, { slots });
    res.send("Data Updated Successfully");
  } catch (err) {
    next(err);
  }
});

aptRouter.get("/getapt", async (req, res, next) => {
  let search = {};

  if (req.body && req.body.name) {
    search.name = req.body.name;
  }
  if (req.body && req.body.filter) {
    search.sp = req.body.filter;
  }
  console.log(search);
  try {
    let data = await aptModel
      .find(search)
      .skip(4 * (req.body.page - 1))
      .limit(4);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

module.exports = aptRouter;
