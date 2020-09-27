const error = (message, code) => {
    let _error = new Error(message);

    if(code)
        _error.statusCode = code;
    return _error;
}

module.exports = error;