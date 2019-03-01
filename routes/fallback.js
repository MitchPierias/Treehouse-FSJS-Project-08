/**
 * Fallback
 * @desc Displays a 'Page not found' view
 * @param {Object} req Connect Request object
 * @param {Object} res Connect Response object
 */
const Fallback = (req, res) => res.render('page-not-found');

module.exports = Fallback;