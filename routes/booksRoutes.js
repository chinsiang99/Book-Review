const { Router } = require("express");
const { getBookListing, getAddBook, AddBook, getBookDescription, AddReview, AddRating, DeleteBook } = require("../controller/booksController");

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

// to get book description
router.route("/description/:id")
  .get(getBookDescription);

// to add review
router.route("/review/:id")
  .post(AddReview);

// to add rating
router.route("/rating")
  .post(AddRating);

// to delete book
router.route("/delete/:id")
  .post(DeleteBook);

module.exports = router;