const User = require("../model/user");
const bcrypt = require('bcryptjs')

const registerUser = async (admin, userData) => {
    try {
        if (admin.role !== "ROLE_ADMIN") {
            throw new Error("Only admins can register users!");
        }

        const { firstname, lastname, email, password, role } = userData;

        const isExist = await User.findOne({ email: email });
        if (isExist) {
            throw new Error("User already exists!");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
            role
        });

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const login = async (userData) => {
    try {
        const { email, password }= userData;

        const user = await User.findOne({ email: email})
        if(!user) {
            throw new Error({message: "User is not found"});
        }

        return user;
    } catch(error) {
        throw new Error(error.message);
    }
}

const findUserById = async () => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            throw new Error("There are no users in the database!");
        }
        return users;
    } catch (error) {
        throw new Error(`Error fetching users:, ${error.message}`);
    }
};

const getUserById = async (id) => {
    try{
        const user = await User.findById(id);
        if(!user){
            throw new Error("user not found!");
        }

        return user;
    } catch(error) {
        throw new Error(`error fetching user: ${error.message}`);
    }
}

module.exports = {
    registerUser,
    login,
    findUserById,
    getUserById
}