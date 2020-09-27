const jwt = require('jsonwebtoken');
const error = require('../utils/error');
//Secret
const { 
    api: { jwtSecret }
} = require('../config');

const sign = userData => (
    jwt.sign(userData, jwtSecret)
);

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req);
        if(!decoded || decoded.id !== owner)
            throw error('User without permission', 401);
    },
    logged: (req) => {
        decodeHeader(req);
    }
}

const getToken = authorization => {
    if(!authorization)
        throw error('Token not provided', 401);
    if(authorization.indexOf('Bearer ') === -1)
        throw error('Invalid token', 401);
    let token = authorization.replace('Bearer ', '');
    return token;
}

const verifyToken = token => jwt.verify(token, jwtSecret);

const decodeHeader = req => {
    const { headers: { authorization } } = req;
    if(!authorization)
        return;
    const token = getToken(authorization); 
    const decoded = verifyToken(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check
};