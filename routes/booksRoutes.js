const { Router } = require("express");
const { getBookListing } = require("../controller/booksController");

const router = Router();

// route to login
router.route("/")
  .get(getBookListing);

module.exports = router;