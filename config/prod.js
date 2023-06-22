module.exports = {
    port: process.env.PROD_PORT,
    g_salt: process.env.G_SALT,
    db_domain: process.env.DB_DOMAIN,
    db_port: process.env.DB_PORT,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_pass: process.env.DB_PASS,
    t_option: process.env.TOKEN_OPTION,
}