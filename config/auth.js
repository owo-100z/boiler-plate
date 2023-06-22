const jwt = require('jsonwebtoken');
const config = require('./config');

const TOKEN_NOTFOUND = -1;
const TOKEN_EXPIRED = -2;
const TOKEN_INVALID = -3;
const UNKNOWN_ERR = -99;

const sign = (user) => {
    const payload = {
        userId: user.USER_ID,
        userNm: user.USER_NAME,
        role: user.USER_ROLE
    };
    return jwt.sign(
        payload, config.g_salt, config.t_option
    );
}

const auth = (req, res, next) => {
    var token = req.headers.token;

    if (!token) return res.json(errMsg(TOKEN_NOTFOUND));

    const user = verify(token);
    if (user === TOKEN_EXPIRED || user === TOKEN_INVALID || user === UNKNOWN_ERR) return res.json(errMsg(user));

    next();
}

module.exports = {
    sign,
    auth
}

// function
const verify = (token) => {
    try {
        return jwt.verify(token, config.g_salt)
    } catch(err) {
        if(err.message === 'jwt expired') {
            return TOKEN_EXPIRED;
        } else if(err.message === 'invalid token' || err.message === 'invalid signature' || err.message === 'invalid algorithm') {
            return TOKEN_INVALID;
        } else {
            return UNKNOWN_ERR;
        }
    }
}

const errMsg = (errCd) => {
    var rtn = {};

    switch (errCd){
        case TOKEN_NOTFOUND:
            rtn.status = 'fail',
            rtn.message = 'token not found'
            break;
        case TOKEN_EXPIRED:
            rtn.status = 'fail',
            rtn.message = 'token expired!'
            break;
        case TOKEN_INVALID:
            rtn.status = 'fail',
            rtn.message = 'invalid token!'
            break;
        default:
            rtn.status = 'fail',
            rtn.message = 'unknown error!'
    }

    return rtn;
}