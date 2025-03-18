const bcrypt = require("bcryptjs");
const User = require("../model/user");

const registerAdmin = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        const isAdminExist = await User.findOne({ role: "ROLE_ADMIN" });
        if (isAdminExist) {
            return res.status(400).json({ message: "Admin already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const admin = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
            role: "ROLE_ADMIN"
        });

        return res.status(201).json({ message: "Admin registered successfully", admin });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { registerAdmin };
 