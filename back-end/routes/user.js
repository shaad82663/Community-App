const express = require('express');
const router = express.Router();

const { registerUser, logInUser, logout, getUser} = require('../controllers/userController');

//Base URL : /api/v1
router.route("/register").post(registerUser);
router.route("/login").post(logInUser);
router.route("/logout").get(logout);
router.route("/me").get(getUser);

module.exports = router;
