const logger = function(req, res, next) {
    console.log("Request received.");
    next();
};

export default logger;
