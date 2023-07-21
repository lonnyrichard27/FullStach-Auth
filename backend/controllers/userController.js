// i used asynchandler instead of try/catch
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

// @desc Auth user/set token alias - Lgogin
// route POST /api/users/auth
// @access public
const authUser = asyncHandler (async ( req, res ) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })

  // this 'matchPasswords' function is from the user model
  if (user && (await user.matchPasswords(password))) {
    generateToken( res, user._id )
    res.status(201).json({ 
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error(' Invalid Email or Password')
  }
})

// @desc Register a new user
// route POST /api/users
// @access public
const registerUser = asyncHandler (async ( req, res ) => {
  const { name, email, password } = req.body;

  // this variable basically checks the database if that user exist and we want to do that by email
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists")
  }

  // create user
  const user = await User.create({
    name,
    email,
    password
  })
  console.log(user);

  if (user) {
    generateToken( res, user._id )
    res.status(201).json({ 
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error(' Invalid User data')
  }
})

// @desc Logout user
// route POST /api/users/logout
// @access public
const logoutUser = asyncHandler (async ( req, res ) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: "User logged out!"})
})

// @desc Get user profile
// route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler (async ( req, res ) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  res.status(200).json(user)
})

// @desc Update user profile
// route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler (async ( req, res ) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    })
  } else {
    res.status(404);
    throw new Error('User not Found')
  }
  res.status(200).json({ message: "update profile"})
})


module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
}