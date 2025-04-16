const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  register,
  login,
  updateUser,
  deleteUser,
  deleteAllUsers,
  getCompanyUsers
} = require('../controllers/user.controller.js');
const validateToken = require('../middlewares/validateTokenHandler.js');
const checkrole = require('../middlewares/checkRole.js');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/v1/users/:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - company
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               company:
 *                 type: string
 *                 description: Company ID (Mongo ObjectId)
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", register);


router.route('/').get(getAllUsers)
router.route('/login').post(login);
router.get('/:id', validateToken, getUser);
router.delete('/delete', validateToken, deleteAllUsers);
router.route('/:id').put(validateToken, checkrole("admin","superAdmin"), updateUser).delete(deleteUser);
router.get('/companyUsers/:id', getCompanyUsers);


module.exports = router;
