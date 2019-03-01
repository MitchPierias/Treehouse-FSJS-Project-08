/**
 * Modules
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./models').sequelize;

/**
 * Express Setup
 */
app.set('view engine', 'pug');

/**
 * Express Middleware
 */
app.use(express.static('public'));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false }));
// Parse application/json
app.use(bodyParser.json());

/**
 * Routes
 */
app.use(require('./routes'));

/**
 * Start
 */
database.sync().then(() => {
    app.listen(8000, () => console.log("Express application listening on port 8000"));
});