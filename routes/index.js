const Router = require('express').Router();

/**
 * Home
 */
Router.use('/', require('./home'));

/**
 * Books
 */
Router.use('/books?', require('./books'));

/**
 * Not Found
 */
Router.use(require('./fallback'));

/**
 * Error
 */
Router.use(require('./error'));

module.exports = Router;