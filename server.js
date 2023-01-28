const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
require('./config/dbConnection');

const app = express();

// to handle cookies
app.use(cookieParser);

// to handle json
app.use(express.json());

// to handle form data in body
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(4000, () => console.log("Hello PORT 4000"));
