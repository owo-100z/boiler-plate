const maria = require('mysql');
const config = require('./config');

const conn = maria.createConnection({
    host: config.db_domain
    , port: config.db_port
    , user: config.db_user
    , password: config.db_pass
    , database: config.db_name
});

module.exports = conn;