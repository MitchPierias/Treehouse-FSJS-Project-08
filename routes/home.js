// Modules
const Router = require('express').Router();

/**
 * Home
 * @desc Redirects to the `/books` route
 */
Router.get('/', (req, res) => res.redirect('/books'));

// Exports
module.exports = Router;