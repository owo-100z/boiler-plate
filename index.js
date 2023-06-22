const express = require('express');
const app = express();

const config = require('./config/config');
const maria = require('./config/maria');

// body parser & json use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// maria db use
maria.connect();

// default
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// user api route
const user = require('./routes/user');
app.use('/api/user', user);

// server start
app.listen(config.port, () => {
    console.log(`server start ${process.env.NODE_ENV}`);
    console.log(`port: ${config.port}`);
});