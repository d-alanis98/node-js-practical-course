const response = require('./response');

const errors = (error, req, res, next) => {
    console.error(`[ERROR]: ${error}`);
    const message = error.message || 'Internal server error';
    const status = error.statusCode || 500;

    response.error(req, res, message, status);
}

module.exports = errors;