const User = require("../models/user");
const uuidValidate = require("uuid-validate");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const sequelize = require("../db/database");


const createPerson = async (req, res) => {
  const { email } = req.body;
  const userAlreadyExists = await User.findOne({ where: { email } });
  if (!userAlreadyExists) {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json(user);
  } else {
    return res.status(StatusCodes.CONFLICT).json("Email already exists");
  }
};

module.exports = {
  createPerson,
};