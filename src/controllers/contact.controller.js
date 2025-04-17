const Contact = require('../models/contact.model.js');
const asyncHandler = require('express-async-handler');

//@desc get all contacts
//@route Get /api/v1/contacts/
//@access private
const getAllContacts = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const contacts = await Contact.find({ userId: req.user.id });
  if (contacts.legth == 0) {
    res.json({ message: 'no contacts to show' });
  }
  res.send(contacts);
});

//@desc post a contact
//@route Post /api/v1/contacts/
//@access private
const postContact = asyncHandler(async (req, res) => {
  const { name, address, phone } = req.body;
  if (!name || !address || !phone) {
    res.status(400);
    throw new Error('all fields are required');
  }
  const existingContact = await Contact.findOne({ phone });
  if (existingContact) {
    res.status(400);
    throw new Error('contact number already present');
  }
  const newContact = await Contact.create({ name, address, phone, userId: req.user.id });
  if (!newContact) {
    res.status(500);
    throw new Error('server error ');
  }
  res.send(newContact);
});

//@desc get a contact
//@route Get /api/v1/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contactId = req.params.id;
  if (!contactId) {
    res.status(400);
    throw new Error('please provide id of contact to fetch');
  }
  const contact = await Contact.findOne({ _id: contactId });
  if (!contact) {
    res.status(404);
    throw new Error('contact not found');
  }
  if (contact.userId.toString() !== req.user.id) {
    res.status(403);
    throw new Error('forbidden you are not authorized to access this contact');
  }

  res.send(contact);
});

//@desc update a user
//@route Put /api/v1/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contactId = req.params.id;
  if (!contactId) {
    res.status(400);
    throw new Error('please provide id of contact to fetch');
  }
  const contact = await Contact.findOne({ _id: contactId });
  if (!contact) {
    res.status(404);
    throw new Error('contact not found');
  }
  if (contact.userId.toString() !== req.user.id) {
    res.status(403);
    throw new Error('forbidden you are not authorized to access this contact');
  }
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

  res.send(updatedContact);
});

//@desc delete a contact
//@route Delete /api/v1/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contactId = req.params.id;
  if (!contactId) {
    res.status(400);
    throw new Error('please provide id of contact to delete');
  }
  const contact = await Contact.findOne({ _id: contactId });
  if (contact.userId.toString() !== req.user.id) {
    res.status(403);
    throw new Error('forbidden you are not authorized to access this contact');
  }
  const deletedContact = await contact.deleteOne();

  res.json({ message: 'contact deleted successfully', deletedContact });
});

module.exports = {
  getAllContacts,
  postContact,
  getContact,
  updateContact,
  deleteContact,
};
