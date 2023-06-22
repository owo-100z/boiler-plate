const router = require('express').Router();

const { query } = require('../db/query');

const sign = require('../config/auth').sign;
const auth = require('../config/auth').auth;

module.exports = router;

router.post('/regist', (req, res) => {
    query.registUser(req, (err, rtn) => {
        var json = {};
        rtn? json.rtn = rtn : json.err = err;

        res.json(json);
    })
});

router.post('/login', (req, res) => {
    query.loginUser(req, (err, rtn) => {
        var json = {};
        rtn? json.user = rtn[0] : json.err = err;

        if(rtn.length === 0) {
            json.message = "login failed";
        } else {
            json.message = "login successed";
            // generate token
            json.token = sign(json.user);
        }

        res.json(json);
    });
});

router.post('/modify', auth, (req, res) => {
    res.json({status: 'success', message: 'success'});
});