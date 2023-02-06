// const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const { expressErrorHandler } = require('./middleware/error_handlerMiddleware');
const router = require('./routes');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const app = express();

// to handle cookies
app.use(cookieParser());

// to handle json
app.use(express.json());

// to handle form data in body
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

// setup base route
app.use("/", router);

app.use(function (req, res, next) {
  res.status(404);
  throw new Error("Not found");
});

// error handling
app.use(expressErrorHandler);

app.listen(4000, () => console.log("Hello PORT 4000"));
