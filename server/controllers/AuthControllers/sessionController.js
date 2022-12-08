//Middle Ware for creating a session upon user login/signup and for verifying if a session is active

// const Session = require('../models/sessionModel');

const sessionController = {};

//this will start a session upon signup/login
sessionController.startSession = (req, res, next) => {};

//this will check if a session is active - will be used for authorization to the /secret route
sessionController.isLoggedIn = (req, res, next) => {};

module.exports = sessionController;
