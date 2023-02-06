const { Router } = require("express");
const booksRoutes = require('./booksRoutes');

const router = Router();

// registering routes here
router.use("/books", booksRoutes);

module.exports = router;