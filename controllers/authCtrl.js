const User = require("../models/user");
const uuidValidate = require("uuid-validate");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const sequelize = require("../db/database");
const { createJWT } = require("../config/jwt");
const { createRefreshJWT } = require("../config/refreshjwt");

const createPerson = async (req, res) => {
  const { email } = req.body;
  const userAlreadyExists = await User.findOne({ where: { email } });
  if (!userAlreadyExists) {
    const user = await User.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ status: "SUCCESS", message: "Signup successful", data: [user] });
  } else {
    return res.status(StatusCodes.CONFLICT).json("Email already exists");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user && (await user.comparePassword(password))) {
    const refreshToken = await createRefreshJWT(user.id);

    // Update the user's refreshToken in the database
    await user.update({ refreshToken }, { returning: true });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.OK).json({
      status: "SUCCESS",
      message: "Signin successful",
      data: [
        {
          id: user.id,
          name: user.name,
          email: user.email,
          token: createJWT(user.id, user.name),
        },
      ],
    });
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: "FAILED", message: "Invalid crendentials" });
  }


  // try {
  //   const user = await User.findOne({ where: { email } });

  //   if (user && (await user.comparePassword(password))) {
  //     const refreshToken = await createRefreshJWT(user.id);

  //     // Update the user's refreshToken in the database
  //     await user.update({ refreshToken }, { returning: true });

  //     res.cookie("refreshToken", refreshToken, {
  //       httpOnly: true,
  //       maxAge: 72 * 60 * 60 * 1000,
  //     });

  //     res.status(StatusCodes.OK).json({
  //       status: "SUCCESS",
  //       message: "Signin successful",
  //       data: [
  //         {
  //           id: user.id,
  //           name: user.name,
  //           email: user.email,
  //           token: createJWT(user.id, user.name),
  //         },
  //       ],
  //     });
  //   } else {
  //     res
  //       .status(StatusCodes.UNAUTHORIZED)
  //       .json({ error: "Invalid credentials" });
  //   }
  // } catch (error) {
  //   console.error("Error:", error);
  //   res
  //     .status(StatusCodes.INTERNAL_SERVER_ERROR)
  //     .json({ error: "Internal server error" });
  // }
};

module.exports = {
  createPerson,
  login
};