const { Router } = require("express");
const { getBookListing, getAddBook, AddBook } = require("../controller/booksController");

const router = Router();

// route to get book listing page
router.route("/")
  .get(getBookListing);

// route to get add book page
router.route("/add")
  .get(getAddBook);

// route to get add book page
router.route("/add")
  .post(AddBook);

module.exports = router;