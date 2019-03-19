// Modules
const route = require('express').Router();
const Joi = require('joi');
const Book = require('../models').Book;
const Sequelize = require('sequelize');
// Validators
const IS_VALID_ID = Joi.number().required().min(1).label("ID");
const IS_VALID_TITLE = Joi.string().required().min(1).label("Title");
const IS_VALID_AUTHOR = Joi.string().required().min(2).label("Author");
const IS_VALID_GENRE = Joi.string().required().min(1).label("Genre");
const IS_VALID_YEAR = Joi.number().required().positive().integer().label("Year");
// Constants
const MAX_RESULTS = 5;

/**
 * All Books
 * @desc Renders all books
 * @note Doesn't include pagination
 */
route.get('/', (req, res, next) => {
    // Pagination
    let page = Number(req.query.page) || 1;
    let args = { offset:(MAX_RESULTS*(page-1)), limit:MAX_RESULTS }
    // Handle search queries
    if (req.query['query']) {
        args.where = Sequelize.literal('title LIKE :query OR author LIKE :query OR genre LIKE :query OR year LIKE :query')
        args.replacements = { query:`%${req.query.query}%` }
    }
    // Retreive all book entries
    Book.findAll(args).then(books => {
        res.render('index', { books, page, baseUrl:req.baseUrl, params:req.query });
    }).catch(err => {
        console.log(err)
        next({ status:500, message:"Failed to find all books" })
    });
});

/**
 * New Book
 * @desc Renders a form for creating an new book entry
 */
route.get('/new', (req, res) => res.render('new-book'));

/**
 * Publish Book
 * @desc Stores a new book in the database
 */
route.post('/new', (req, res, next) => {
    // Deconstruct and validate arguments
    const { title, author, genre, year } = req.body;
    Joi.assert(title, IS_VALID_TITLE);
    Joi.assert(author, IS_VALID_AUTHOR);
    Joi.assert(genre, IS_VALID_GENRE);
    Joi.assert(year, IS_VALID_YEAR);
    // Store the new book entry
    Book.create({ title, author, genre, year }).then(book => {
        // Successfully created
        res.redirect('/books');
    }).catch(err => next({ status:500, message:"Failed to create new book" }));
});

/**
 * Get Book
 * @desc Retreives a book with the specified id
 */
route.get('/:id', (req, res, next) => {
    // Deconstruct and validate parameters
    const { id } = req.params;
    Joi.assert(id, IS_VALID_ID);
    // Find and return book at ID
    Book.findByPk(id).then(book => {
        // Handle query response object
        if (!book) return next({ status:404, message:`Book '${id}' not found` });
        res.render('update-book', { book });
    }).catch(err => next({ status:500, message:"Failed to find book" }));
});

/**
 * Update Book
 * @desc Updates the record for a given book
 */
route.post('/:id', (req, res, next) => {
    // Deconstruct arguments
    const { id } = req.params;
    const { title, author, genre, year } = req.body;
    // Validate arguments
    Joi.assert(id, IS_VALID_ID);
    Joi.assert(title, IS_VALID_TITLE);
    Joi.assert(author, IS_VALID_AUTHOR);
    Joi.assert(genre, IS_VALID_GENRE);
    Joi.assert(year, IS_VALID_YEAR);
    // Find the requested book
    Book.findById(id).then(book => {
        // Update the book
        if (!book && 'object' !== typeof book) return next({ status:404,message:`Book '${id}' not found`} );
        book.update({ title, author, genre, year })
    }).then(book => {
        // Redirct back home
        res.redirect('/books');
    }).catch(err => next({ status:500, message:"Failed to update book" }));
});

/**
 * Delete Book
 * @desc Removes a book entry from the database
 */
route.post('/:id/delete', (req, res, next) => {
    // Deconstruct and validate parameters
    const { id } = req.params;
    Joi.assert(id, IS_VALID_ID);
    // Find a remove book entry
    Book.findById(id).then(book => {
        // Handle the book query
        if (!book && 'object' !== typeof book) return next({ status:404,message:`Book '${id}' not found`} );
        book.destroy();
    }).then(() => {
        // Book successfully deleted
        res.redirect('/books');
    }).catch(err => next({ status:500, message:"Failed to delete book" }));
});

module.exports = route;