const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const authApi = require("./routes/authApi")
const orderApi = require("./routes/orderApi")

dotenv.config();

mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("Database connected!"))
.catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use("/api/auth", authApi);
app.use("/api/orders", orderApi);
app.use('/', express.static('static'))

app.listen(process.env.PORT || 3300, function () {
    console.log('Server is running!');
})
