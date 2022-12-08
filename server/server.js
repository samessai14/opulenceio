//Module Imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const { urlencoded } = require('express');
const cors = require('cors');

//Controller Imports
const userController = require('./controllers/AuthControllers/userController');
const cookieController = require('./controllers/AuthControllers/cookieController');
const sessionController = require('./controllers/AuthControllers/sessionController');
const yahooFinanceController = require('./controllers/yahooFinanceController');
const { array } = require('prop-types');

//================================================================================
//                                SERVER CONFIG
const PORT = 3000;
const app = express();
//================================================================================
//                                 MONGO CONFIG

const mongoURI =
  'mongodb+srv://sami123:KEsjQLxJOYzXXu6e@health-of-my-wealth.ckkiudx.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//================================================================================
//                            DEFAULT EXPRESS ACTIONS
// app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());
//this will grab the cookies from req.header.cookie and store them in an an object at req.cookies
app.use(cookieParser());
//sending static files
// app.use(express.static(path.resolve(__dirname, '../client')));

//================================================================================
//                                 PUBLIC ROUTES

//Root Route - we will be sending the index.html for the react app upon a get request here
app.get('/', (req, res) => {
  res.sendStatus(200);
});
// app.get('/bundle.js', (req, res) => {
//   console.log('hello');
//   res.sendFile(
//     '/Users/samimessai/Desktop/SoloProjectVersions/my-solo-project-V2/build/bundle.js'
//   ); //TODO
// });
//dumb fav icon request
app.get('/favicon.ico', (req, res) => {
  res.sendStatus(200);
});

//      SIGNUP ROUTE
//-------------------------
// Sign Up Route - GET(for the page) and POST(to register) requests
//this should also send some information to the react app that lets it know that we are on the sign up page and to update its state;
app.get('/signup', (req, res) => {
  res.sendStatus(200);
}); //TODO);

//on a signup post request, our middle ware chain will 1) create a user, 2) start a session, 3)set the SSID cookie on the response, 4) send the response back to the client
//THIS IS WORKING
app.post(
  '/signup',
  userController.createUser,
  // sessionController.startSession,
  // cookieController.setSSIDCookie,
  (req, res) => {
    res.status(200).json(res.locals.newUser);
  }
);

//      LOGIN ROUTE
//-------------------------
//Login Route - POST (sending login info)
//on a login submission, our middle ware chain will 1) verify user credentials, 2) start a session, 3) set ssid cookie, 4) respond to client
//VERIFICATION IS WORKING
//TODO - add cookies and session
app.post(
  '/login',
  userController.verifyUser,
  yahooFinanceController.getQuotes,
  // sessionController.startSession,
  // cookieController.setSSIDCookie,
  (req, res) => {
    if (!res.locals.analytics) {
      res.status(200).json([]);
    }
    res.status(200).json(res.locals.analytics);
  }
);

app.patch('/update', userController.updateUserPortfolio, (req, res) => {
  res.status(200).json(res.locals.updatedUser);
});

//================================================================================
//        AUTHORIZED ROUTES - User Must Receive Permission to Access These

//TODO - DETERMINE ROUTES

//================================================================================
//                        BAD ROUTES and ERROR HANDLER
//catch all route handler
app.use((req, res) => {
  app.status(404).send('Page Not Found!');
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const newErrObj = Object.assign(defaultErr, err);
  console.log('ERROR: ', newErrObj.log);
  const errorStatus = newErrObj.status || 500;
  return res.status(errorStatus).send(newErrObj.message);
});

//================================================================================
//                                   LISTEN

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
