const mongoose = require('mongoose');

//BCRYPT SETUP SO WE CAN HANDLE THE HASHING IN THE MONGOOSE MIDDLE WARE
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

// The document schema should have 3 things
// A "username" that is a string
// A "password" that is a string
// An "age" that is a number
// All of these should be required.
// Create your schema here
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  portfolio: [{ ticker: String, marketValue: Number }],
});

userSchema.pre('save', function (next) {
  const user = this;
  //bcrypt hash takes in a string password and a work factor, and returns a promise where the hashed password is passed in and can be accessed through a callback function in the .then or await
  bcrypt
    .hash(user.password, SALT_WORK_FACTOR)
    .then((hash) => {
      user.password = hash;
      return next();
    })
    .catch((err) => {
      return next(
        'Error in hashing of userController.createUser: ' + JSON.stringify(err)
      );
    });
});

// You must export your model through module.exports
// The collection name should be 'student'
module.exports = mongoose.model('user', userSchema);
