const maria = require('../config/maria');
const config = require('../config/config');
const crypto = require('crypto');

var query = {};
module.exports = { query }

// query
query.registUser = (req, callback) => {
    var data = req.body;

    if(!valChk(data)){
        return callback({'message': 'input Error!'}, null);
    }

    data = setData(data);

    qry = `INSERT INTO
                USER_INFO ( USER_ID
                          , USER_PASS
                          , USER_ROLE
                          , USER_NAME )
           VALUES ( '${data.userId}'
                  , '${data.userPass}'
                  , '01'
                  , '${data.userName}' )`;

    queryExcute(qry, callback);
}

query.loginUser = (req, callback) => {
    var data = req.body;

    data = setData(data);

    qry = `SELECT USER_ID
                , USER_NAME
                , USER_ROLE
             FROM USER_INFO
            WHERE USER_ID = '${data.userId}'
              AND USER_PASS = '${data.userPass}'`;

    queryExcute(qry, callback);
}

// function
const queryExcute = (qry, callback) => {
    maria.query(qry, function(err, rows, fields){
        if (!err) {
            callback(null, rows);
        } else {
            console.error(`err: ${err}`);
            callback(err, null);
        }
    });
}

const valChk = (data) => {
    if(!data.userPass) {
        return false;
    }

    return true;
}

const setData = (data) => {
    data.userPass = crypto.createHash('sha512').update(data.userPass+config.g_salt).digest('base64');
    data.userName = data.userName ? data.userName : '';
    
    return data;
}