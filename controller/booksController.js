const asyncHandler = require("express-async-handler");

const { connection } = require('../config/dbConnection');

// to get book listing page
const getBookListing = asyncHandler(async (req, res, next) => {
  let order = req.query.order ?? "ASC";

  connection.promise().query("SELECT `id`, `bookName`, `bookImage`, `bookAuthor` FROM `book` ORDER BY `bookName` " + order)
    .then(([rows, fields]) => {
      res.render("bookListing", { bookListing: rows })
    })
    .catch(err => {
      console.log(err);
    });
});

// to get add book page
const getAddBook = asyncHandler(async (req, res, next) => {

  res.render("bookAdd", { success: 0 })

});

// to add new books
const AddBook = asyncHandler(async (req, res, next) => {
  const { bookName, bookImage, bookAuthor, description } = req.body;

  connection.promise().query("INSERT INTO `book` (`bookName`, `bookImage`, `bookAuthor`, `description`) VALUES (?,?,?,?) ", [bookName, bookImage, bookAuthor, description])
    .then(([rows, fields]) => {
      res.render('bookAdd', { success: 1 });
    })
    .catch(err => {
      console.log(err);
    });

});

// get book description page
const getBookDescription = asyncHandler(async (req, res, next) => {

  const { id } = req.params;

  let book_result = {};
  let book_rating = {};
  let book_review = {};

  await connection.promise().query("SELECT id, bookName, description, bookImage, bookAuthor FROM book WHERE id = ?", [id])
    .then(([rows, fields]) => {
      if (rows.length) {
        book_result = rows[0];
      }
    })
    .catch(err => {
      console.log(err);
    });

  await connection.promise().query("SELECT AVG(rating) as rating FROM rating WHERE bookId = ?", [id])
    .then(([rows, fields]) => {
      book_rating = rows[0];
    })
    .catch(err => {
      console.log(err);
    });

  await connection.promise().query("SELECT review FROM review WHERE bookId = ?", [id])
    .then(([rows, fields]) => {
      book_review = rows;
    })
    .catch(err => {
      console.log(err);
    });

  res.render('bookDescription', { book_result: book_result, book_rating: book_rating, book_review: book_review });

});

// to add book review
const AddReview = asyncHandler(async (req, res, next) => {
  const { review } = req.body;
  const { id } = req.params;

  await connection.promise().query("INSERT INTO `review` (`bookId`, `review`) VALUES (?,?) ", [id, review])
    .then(([rows, fields]) => {
      res.redirect(req.get('referer'));
    })
    .catch(err => {
      console.log(err);
    });

});

// to add book rating
const AddRating = asyncHandler(async (req, res, next) => {
  const { bookId, rating } = req.body;

  await connection.promise().query("INSERT INTO `rating` (`bookId`, `rating`) VALUES (?,?) ", [bookId, rating])
    .then(([rows, fields]) => {
      res.redirect(req.get('referer'));
    })
    .catch(err => {
      console.log(err);
    });

});

// to delete book
const DeleteBook = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await connection.promise().query("DELETE FROM book WHERE id = ? ", [id])
    .then(([rows, fields]) => {
      res.redirect('/books');
    })
    .catch(err => {
      console.log(err);
    });

});

module.exports = { getBookListing, getAddBook, AddBook, getBookDescription, AddReview, AddRating, DeleteBook }