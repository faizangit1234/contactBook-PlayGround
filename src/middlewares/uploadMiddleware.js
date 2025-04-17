// const multer = require("multer");
// const path = require("path");

// // Storage setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // make sure this folder exists
//   },
//   filename: (req, file, cb) => {
//     // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
//     cb(null, file.originalname + path.extname(file.originalname));
//   }
// });

// // File filter (only images)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;

// src/config/multerConfig.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary.js');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars', // change folder name if needed
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

module.exports = upload;
