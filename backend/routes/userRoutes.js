const express = require('express');
const { 
  authUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  registerUser
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.post('/auth', authUser)
router.route('/profile').get( protect, getUserProfile ).put( protect, updateUserProfile )


module.exports = router;