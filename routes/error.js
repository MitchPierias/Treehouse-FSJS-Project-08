/**
 * Error Handler
 * @desc Handles error passed through the `next` router function
 * @param {String|Object} error Error message or object passed down through an express `next` call
 * @param {Object} req Connect Request object
 * @param {Object} res Connect Response object
 */
const ErrorHandler = (error, req, res, next) => {
    // Set headers
    res.status(error.status||500)
    // Manage erorr payload
    if ('string' === typeof error) error = { message:error };
    if (500 === res.status) error.message = "Internal Server Error";
    // Render the error view
    res.render('error', { error });
}

module.exports = ErrorHandler;