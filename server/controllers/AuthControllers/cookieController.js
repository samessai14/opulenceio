//creating our cookieController - this middle ware will be used for setting cookies in the middleware chain.

const cookieController = {};

//setting SSID cookie - for tracking sessions
cookieController.setSSIDCookie = (req, res, next) => {};

module.exports = cookieController;
