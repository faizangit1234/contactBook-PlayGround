// const constants = require("../constants.js");
// const Contact = require("../models/contactModel.js")
// const asyncHandler = require('express-async-handler');
// //@desc Get all routes
// //@route Get /api/v1/contacts
// //@access private
// const GetContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.find({user_id : req.user.id});
//   res.status(200).json(contact);
// })

// //@desc Get a contact
// //@route Get /api/v1/contacts/:id
// //@access private
// const GetContactById = asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   if (!id) {
//     const err= new Error("please provide an id")
//     err.statusCode = constants.VALIDATION_ERROR
//     throw err
//   }

//   const contact = await Contact.findById(id)
//   if (!contact) {
//     res.statusCode(constants.NOT_FOUND)
//     err.statusCode(constants.NOT_FOUND)
//     throw new Error("no such contact found")
//   }

//   if(contact.user_id.toString() !== req.user.id){
//     res.status(403);
//     throw new Error("forbidden not allowed to alter other users contacts")
//   }
//   res
//     .status(200)
//     .json(contact);
// });

// //@desc Post a contact
// //@route Post /api/v1/contacts
// //@access private
// const createContact = asyncHandler(async (req, res) => {

//   const { name, email, phone } = req.body;
//   if (!name || !email || !phone) {
//     res.status(400);
//     throw new Error('all fields are mandatory');
//   }
//   const contact = await Contact.create({ name, email, phone ,user_id : req.user.id})

//   res.status(200).json(contact);
// });

// //@desc Update a contact
// //@route Put /api/v1/contacts/:id
// //@access private
// const UpdateContact = asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   if (!id) {
//     res.status(402)
//     throw new Error("please provide an id")
//   }
//   const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true })
//   res
//     .status(200)
//     .json(contact);
// });

// //@desc Delete a contact
// //@route DELETE /api/v1/contacts/:id
// //@access private
// const deleteContact = asyncHandler(async (req, res) => {
//   const id = req.params.id;

//   if (!id) {
//     const err = new Error("Please provide an ID");
//     err.statusCode = 404;
//     throw err;
//   }

//   const contact = await Contact.findById(id);

//   if (!contact) {
//     const err = new Error("No such contact found");
//     err.statusCode = 404;
//     throw err;
//   }

//   await Contact.deleteOne(); // ✅ This deletes the found document

//   res.status(200).json({
//     message: "Contact deleted successfully",
//     deletedContact: contact,
//   });
// });

// module.exports = {
//   GetContact,
//   GetContactById,
//   createContact,
//   deleteContact,
//   UpdateContact,
// };

const constants = require('../constants.js');
const Contact = require('../models/contactModel.js');
const asyncHandler = require('express-async-handler');

// @desc Get all contacts
// @route GET /api/v1/contacts
// @access Private
const GetContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user._id });
  res.status(200).json(contacts);
});

// @desc Get a single contact
// @route GET /api/v1/contacts/:id
// @access Private
const GetContactById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error('Please provide an ID');
  }

  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(constants.NOT_FOUND);
    throw new Error('No such contact found');
  }

  if (contact.user_id.toString() !== req.user._id) {
    res.status(constants.FORBIDDEN);
    throw new Error("Forbidden: Not allowed to view other users' contacts");
  }

  res.status(200).json(contact);
});

// @desc Create a contact
// @route POST /api/v1/contacts
// @access Private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error('All fields are mandatory');
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user._id,
  });

  res.status(201).json(contact);
});

// @desc Update a contact
// @route PUT /api/v1/contacts/:id
// @access Private
const UpdateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error('Please provide an ID');
  }

  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(constants.NOT_FOUND);
    throw new Error('No such contact found');
  }

  if (contact.user_id.toString() !== req.user._id) {
    res.status(constants.FORBIDDEN);
    throw new Error("Forbidden: You can't update this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedContact);
});

// @desc Delete a contact
// @route DELETE /api/v1/contacts/:id
// @access Private
const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error('Please provide an ID');
  }

  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(constants.NOT_FOUND);
    throw new Error('No such contact found');
  }

  if (contact.user_id.toString() !== req.user._id) {
    res.status(constants.FORBIDDEN);
    throw new Error("Forbidden: You can't delete this contact");
  }

  await contact.deleteOne();

  res.status(200).json({
    message: 'Contact deleted successfully',
    deletedContact: contact,
  });
});

module.exports = {
  GetContact,
  GetContactById,
  createContact,
  deleteContact,
  UpdateContact,
};
