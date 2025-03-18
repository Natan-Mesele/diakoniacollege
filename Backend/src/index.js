const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./route/userRoutes');
app.use('/auth', userRoutes);

const adminRoutes = require("./route/adminRoutes");
app.use("/admin", adminRoutes);

module.exports = app;