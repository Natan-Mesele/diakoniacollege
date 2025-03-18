const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ROLE_ADMIN','ROLE_STUDENT','ROLE_TEACHER'],
        default: 'ROLE_STUDENT'
    }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;