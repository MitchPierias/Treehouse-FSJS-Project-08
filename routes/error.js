/**
 * Error Handler
 * @desc Handles error passed through the `next` router function
 * @param {String|Object} error Error message or object passed down through an express `next` call
 * @param {Object} req Connect Request object
 * @param {Object} res Connect Response object
 */
const ErrorHandler = (error, req, res) => {
    res.status(error.status||500)
    if ('string' === typeof error) error = {message:err};
    // Render the error view
    res.render('error', { error });
}

module.exports = ErrorHandler;