// controllers/adminAuthController.js

const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");

// Utility function to generate JWT tokens
const generateToken = ({ _id, role, email }) => {
    return jwt.sign({ id: _id, role, email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

// Register a new admin
exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if the email is already registered
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return next(new CustomError(400, "Admin with this email already exists"));
        }

        // Create and save a new admin
        const admin = new Admin({ email, password });
        await admin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        next(new CustomError(500, "Error registering admin"));
    }
};

// Admin login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // Find admin by email
        const admin = await Admin.findOne({ email });
        
        // Validate password
        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).render("login", { error: "Invalid email or password" });
        }

        // Generate and set JWT token as a cookie
        const token = generateToken(admin);
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        
        res.redirect("/admin/dashboard");
    } catch (error) {
        next(new CustomError(500, "Error logging in admin"));
    }
};

// Middleware to authenticate admin using JWT
exports.authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).redirect("/admin/login");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).redirect("/admin/login");
        }
        req.admin = decoded;
        next();
    });
};
