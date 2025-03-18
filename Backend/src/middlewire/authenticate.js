const { getUserIdFromToken } = require("../config/jwtProvider");
const User = require("../model/user");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const userId = getUserIdFromToken(token);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: "Invalid token, user not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Authentication failed: " + error.message });
    }
};

const authorizeAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: "Unauthorized: User not found" });
    }

    if (req.user.role !== "ROLE_ADMIN") {
        return res.status(403).json({ message: "Access denied! Only admins can perform this action." });
    }

    next();
};

module.exports = { authenticate, authorizeAdmin };
