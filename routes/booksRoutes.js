const { Router } = require("express");
const { getBookListing, getAddBook, AddBook, getBookDescription, AddReview, AddRating } = require("../controller/booksController");

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

router.route("/description/:id")
  .get(getBookDescription);

router.route("/review/:id")
  .post(AddReview);

router.route("/rating")
  .post(AddRating);

module.exports = router;