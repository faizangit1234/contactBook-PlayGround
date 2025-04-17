// src/routes/upload.routes.js
const express = require('express');
const upload = require('../middlewares/uploadMiddleware.js');
const validateToken = require('../middlewares/validateTokenHandler');
const router = express.Router();

/**
 * @swagger
 * /api/v1/upload/avatar:
 *   post:
 *     summary: Upload avatar to Cloudinary
 *     tags: [File Upload]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload successful
 *       400:
 *         description: Error uploading file
 */
router.post('/avatar', upload.single('avatar'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: 'Upload failed' });
  }
  res.status(200).json({ imageUrl: req.file.path });
});

module.exports = router;
