const highscores = require('../routes/highscores');
const users = require('../routes/users');
const auth = require('../routes/auth');
const express = require('express');
const logger = require('../middleware/logger');
const authenticate = require('../middleware/authenticator');
const helmet = require('helmet');
const error = require('../middleware/error');

module.exports = function (app) {

    app.use(express.json());
    app.use(helmet());
    app.use(logger);
    app.use(authenticate);
    app.use('/api/pandemiceo', highscores);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}