const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'please add contact name'],
    },
    email: {
      type: String,
      required: [true, 'please add contact email'],
    },
    phone: {
      type: String,
      required: [true, 'please add contact phone'],
      unique: [true, 'phone must be unique'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
