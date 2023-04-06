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
  let filter = {};
  if (req.body && req.body.name) {
    search = { name: req.body.name };
  }
  if (req.body && req.body.filter) {
    filter = { sp: req.body.filter };
  }

  try {
    let data = await aptModel
      .find(search, filter)
      .skip(1 * (req.body.page - 1))
      .limit(4);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

module.exports = aptRouter;
