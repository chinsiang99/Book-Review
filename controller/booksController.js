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
      console.log(rows);
      res.render('bookAdd', { success: 1 });
    })
    .catch(err => {
      console.log(err);
    });


});

module.exports = { getBookListing, getAddBook, AddBook }