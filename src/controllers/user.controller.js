const asyncHandler = require('express-async-handler');
const User = require('../models/user.model.js');
const Company = require('../models/company.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc get all users
//@route /api/v1/users/
//@private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.send(users);
});

//@desc post a user
//@route /api/v1/users/
//@public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, company, department, role } = req.body;
  const avatarUrl = req.file.path;
  console.log(avatarUrl);
  if (!name || !email || !password || !company) {
    res.status(400);
    throw new Error('all fields are necessary');
  }
  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error('email already exists');
  }
  const hashedPass = await bcrypt.hash(password, 10);
  console.log(req.body);
  const user = await User.create({
    name,
    email,
    password: hashedPass,
    company,
    department,
    role,
    avatar: avatarUrl,
  });
  if (!user) {
    res.status(400);
    throw new Error('invalid fields');
  }

  res.send({
    message: 'user created successfully',
    user: {
      name: user.name,
      email: user.email,
      company: company,
      department: department,
      role: role,
      avatar: avatarUrl,
    },
  });
});

//@desc login a user
//@route /api/v1/users/login
//@public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('all fields are mandatory');
  }
  if (!(await User.findOne({ email }))) {
    throw new Error('email does not exist');
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        email: user.email,
        name: user.name,
        id: user._id,
        companyId: user.company,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' },
    );
    res.status(200).json({
      message: 'login successfully',
      accessToken: accessToken,
    });
  }
});

//@desc get a user
//@route /api/v1/users/:id
//@access private
const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new Error('id is must');
  }
  const user = await User.findById(id);
  if (!user) {
    throw new Error('user not found');
  }
  res.send(user);
});

//@desc update a user
//@route /api/v1/users/:id
//@public
const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new Error('id is must');
  }
  const user = await User.findById(id);
  if (!user) {
    throw new Error('user not found');
  }
  const Updateduser = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.send(Updateduser);
});

//@desc delete a user
//@route /api/v1/users/:id
//@public
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new Error('id is must');
  }
  const user = await User.findById(id);
  if (!user) {
    throw new Error('user not found');
  }
  const deleteduser = await user.deleteOne();
  res.send(deleteduser);
});

//@desc delete all users
//@route Delete /api/v1/users/delete
//@private
const deleteAllUsers = asyncHandler(async (req, res) => {
  const success = await User.deleteMany({});
  if (!success) {
    throw new Error('failed');
  }
  res.send('success');
});

const getCompanyUsers = asyncHandler(async (req, res) => {
  const companyId = req.params.id;
  if (!companyId) {
    throw new Error('id is must');
  }
  const company = await Company.findById(companyId);
  if (!company) {
    throw new Error('Company not found');
  }
  const companyUsers = await User.find({ company: companyId });
  if (!companyUsers) {
    res.status(404);
    throw new Error('no such company found');
  }
  res.send(companyUsers);
});

module.exports = {
  getAllUsers,
  getUser,
  register,
  login,
  updateUser,
  deleteUser,
  deleteAllUsers,
  getCompanyUsers,
};
