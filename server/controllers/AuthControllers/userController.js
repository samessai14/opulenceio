// USER CREATION AND VALIDATION MIDDLE WARE - We will create a new user upon post to /signup, and verify user upon post to /login
const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');

const UserController = {
  createUser(req, res, next) {
    // console.log(req.body);
    //destructure firstName, lastName, age from req.body
    const { username, password, portfolio } = req.body;
    //attempt to create a document in the User collection and catch any errors
    User.create({ username, password, portfolio }, (err, user) => {
      // console.log(user);
      if (err) {
        console.log(err);
        return next({
          log: 'Error: UserController.createUser middleware',
          message: {
            err: err,
          },
        });
      }
      //if no error, then we can store the newly created User in our res.locals and send it back in main.js
      res.locals.newUser = user;
      //return next to move on to next step in middle ware chain
      return next();
    });
  },

  verifyUser(req, res, next) {
    const { username, password } = req.body;
    console.log(req.body);
    //to compare the input password by the user with the one in the database, we have to use bcrypt's compare method, which will internally apply the same salt and workfactor to the input password to check it against the one we hashed and saved in the database

    //We first find the account by unique username since if the username isn't in the database, there's no point checking the password
    User.find({ username })
      .then((data) => {
        if (data.length === 0) {
          // return res.redirect('/signup'); TODO - deal with invalid login
          return next();
        }
        bcrypt
          .compare(password, data[0].password)
          .then((result) => {
            if (!result) {
              return res.redirect('/signup');
            } else {
              res.locals.user = data[0];
              return next();
            }
          })
          .catch((err) =>
            next(
              'Error in hash of userController.verifyUser: ' +
                JSON.stringify(err)
            )
          );
      })
      .catch((err) =>
        next({
          log: 'There was an issue in verifyUserController',
          message: { err },
        })
      );
  },

  updateUserPortfolio(req, res, next) {
    const { username, newPortfolio } = req.body;
    if (!username || !newPortfolio) {
      return next({
        log: 'There was an issue with the req.body in the patch request to update a user portfolio',
        message: { err: 'Error in attempting to update portfolio!' },
      });
    }

    User.findOneAndUpdate(
      { username },
      { portfolio: newPortfolio },
      {
        new: true,
      }
    )
      .then((data) => {
        console.log(data);
        res.locals.updatedUser = data;
        return next();
      })
      .catch((err) => {
        return next({
          log: 'There was a database issue when attempting to findOneAndUpdate',
          message: { err },
        });
      });
  },
};

module.exports = UserController;
