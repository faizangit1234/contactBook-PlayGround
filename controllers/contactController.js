const asyncHandler = require('express-async-handler');
//@desc Get all routes
//@route Get /api/v1/contacts
//@access public
const GetContact = (req, res) => {
  res.status(200).json({ message: 'get all contacts' });
};

//@desc Get a contact
//@route Get /api/v1/contacts/:id
//@access public
const GetContactById = async (req, res) => {
  res
    .status(200)
    .json({ message: `get contact successfully id = ${req.params.id}` });
};

//@desc Post a contact
//@route Post /api/v1/contacts
//@access public
const createContact = async (req, res) => {
  console.log(`req body is `, req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('all fields are mandatory');
  }
  res.status(200).json({ message: 'contact added successfully' });
};

//@desc Update a contact
//@route Put /api/v1/contacts/:id
//@access public
const UpdateContact = async (req, res) => {
  res
    .status(200)
    .json({ message: ` updated successfully id = ${req.params.id}` });
};

//@desc Delete a contact
//@route Delete /api/v1/contacts/:id
//@access public
const deleteContact = async (req, res) => {
  res
    .status(200)
    .json({ message: `deleted successfully id = ${req.params.id}` });
};

module.exports = {
  GetContact,
  GetContactById,
  createContact,
  deleteContact,
  UpdateContact,
};
