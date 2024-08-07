const express = require("express");
const {
  registerController,
  loginController,
  alluser,
} = require("../controller/userController");
const auth = require("../middlware/auth");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/all", alluser);
module.exports = router;
