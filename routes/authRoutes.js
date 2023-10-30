const express = require("express");
const router = express.Router();

const {
  createPerson,
} = require("../controllers/authCtrl");

router.post("/register", createPerson);

module.exports = router;
