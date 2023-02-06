const { Router } = require("express");
const { getBookListing, getAddBook } = require("../controller/booksController");

const router = Router();

// route to get book listing page
router.route("/")
  .get(getBookListing);
// route to get add book page
router.route("/add")
  .get(getAddBook);

module.exports = router;