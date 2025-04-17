const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      lowercase: [true, 'email is preferred in lowercase'],
      unique: [true, 'email is already registered'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['employee', 'manager', 'admin', 'superAdmin'],
      default: 'employee',
      trim: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
