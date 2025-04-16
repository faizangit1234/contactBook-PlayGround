const mongoose = require('mongoose');
const contactSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'name of contact is required'],
    },
    address: {
      type: String,
      required: [true, 'address of contact is required'],
    },
    phone: {
      type: String,
      required: [true, 'phone of contact is required'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Contact', contactSchema);
