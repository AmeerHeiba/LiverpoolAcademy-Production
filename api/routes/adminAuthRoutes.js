const express = require("express");
const router = express.Router();
const adminAuthController = require("../../controllers/adminAuthController");
const validate = require("../../middlewares/validate");
const adminValidation = require("../../validations/adminValidation");
const authenticateAdmin = require("../../middlewares/authenticateAdmin");
const adminController = require("../../controllers/adminController");

// Register route
router.post("/register", validate(adminValidation.register), adminAuthController.register);
router.get("/login", (req, res) => {
    console.log("Login route accessed");
    res.render("admin/login")
});

// Login route
router.post("/login", validate(adminValidation.login), adminAuthController.login);

module.exports = router;