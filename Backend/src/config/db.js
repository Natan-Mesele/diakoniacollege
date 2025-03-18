require('dotenv').config();
const mongoose = require('mongoose');

const mongodbUrl = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUrl);
        console.log("MongoDB connected successfully");
    } catch(error) {
        console.log("MongoDB connection error:", error.message);
    }
}

module.exports = connectDB;