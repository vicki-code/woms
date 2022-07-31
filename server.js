const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use('/', express.static('static'))

app.listen(process.env.PORT || 3300, function () {
    console.log('Server is running!');
})
