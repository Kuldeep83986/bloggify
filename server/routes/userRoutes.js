const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, admin, getAllUsers);

router.route('/:id')
  .delete(protect, admin, deleteUser);

module.exports = router;
