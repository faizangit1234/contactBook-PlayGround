const express = require("express")
const router = express.Router();
const {
    registerUser,
    loginUser,
    currentUser
} = require("../controllers/userController.js");
const validateToken = require("../middlewares/validateTokenHandler.jsx");

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.post("/current",validateToken, currentUser)

module.exports= router;