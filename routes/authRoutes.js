const express = require("express");
const router = express.Router();

const {
  createPerson, login
} = require("../controllers/authCtrl");

router.post("/register", createPerson);
router.post("/login", login)

module.exports = router;
