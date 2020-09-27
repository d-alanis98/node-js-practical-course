const DEFAULT_ERROR_CODE        = 500;
const DEFAULT_SUCCESS_CODE      = 200;
const DEFAULT_ERROR_MESSAGE     = 'Internal server error';
const DEFAULT_SUCCESS_MESSAGE   = 'Ok';


exports.success = (
    req, 
    res, 
    message = DEFAULT_SUCCESS_MESSAGE, 
    status = DEFAULT_SUCCESS_CODE
) => {
    res.status(status)
        .send(message);
}

exports.error = (
    req, 
    res, 
    message = DEFAULT_ERROR_MESSAGE, 
    status = DEFAULT_ERROR_CODE
) => {
    res.status(status)
        .send(message);
}