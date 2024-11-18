const CustomError = require("../utils/CustomError");

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Log error details (for debugging purposes only)
    console.error("Error:", err);

    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};

module.exports = errorHandler;
