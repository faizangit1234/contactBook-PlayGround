const asyncHandler = require('express-async-handler');
const User = require("../models/userModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//@desc register user
//@route Post /api/v1/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("all fields are mandatory lala")
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password: hashedPassword })
  if (user) {
    const displayUser = { name: user.name, email: user.email }
    res.status(201).send(displayUser).json("user registered successfully")
  } else {
    res.status(400)
    throw new Error("invalid fields")
  }
})

//@desc login user
//@route Post /api/v1/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })
  if (user && await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          _id: user.id,
          name: user.name
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    )
    res.status(200).json({ accessToken })
  } else {
    res.status(400)
    throw new Error("invalid email or password")
  }
}
)

//@desc get user details
//@route post /api/v1/users/current
//@access Private
const currentUser = asyncHandler(async (req, res) => {
  res.send(req.user)
})

module.exports = { registerUser, loginUser, currentUser }