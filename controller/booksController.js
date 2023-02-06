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

module.exports = { getBookListing }