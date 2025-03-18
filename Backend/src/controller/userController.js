const { generateToken } = require('../config/jwtProvider');
const userService = require('../service/userService');

const register = async (req, res) => {
    try {
        if (req.user.role !== "ROLE_ADMIN") {
            return res.status(403).json({ message: "Only admins can register users!" });
        }

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const user = await userService.registerUser(req.user, req.body);
        const jwt = generateToken(user._id);
        return res.status(201).json({ jwt, message: "Registration successfully done!", user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await userService.login(req.body);
        const jwt = generateToken(user._id);
        return res.status(201).json({ jwt, message: "Login successfully done!", user})
    } catch(error) {
        return res.status(500).json(error.message);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json({ message: "All users fetched successfully!", users });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        return res.status(200).json({ message: "User details fetched successfully!", user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    loginUser,
    getAllUsers,
    getUserById
}