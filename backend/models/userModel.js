const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    required: true,
    unique: true
  },
  password: {
    type: 'string',
    required: true
  },
}, { timestamps: true});

// pre here means before it enters the database
userSchema.pre('save', async function(next) {
  // this refers to the 'user' object in the controller
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  // the code below will hash the password before it enters the database
  this.password = await bcrypt.hash(this.password, salt)
});

// we're writing this password just so that when we're trying to login we compare both email and password (P.S remember the password has been hashed using bcrypt )
userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare( enteredPassword, this.password )
}

module.exports = mongoose.model('User', userSchema);
