const express = require('express');
const {
  GetContact,
  GetContactById,
  createContact,
  deleteContact,
  UpdateContact,
} = require('../controllers/contactController.js');

const router = express.Router();

router.route('/').get(GetContact).post(createContact);

router
  .route('/:id')
  .get(GetContactById)
  .put(UpdateContact)
  .delete(deleteContact);

module.exports = router;
