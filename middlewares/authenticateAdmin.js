const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");

module.exports = (req, res, next) => {
    const token = req.cookies.token; // Retrieve token from cookie
    if (!token) return next(new CustomError(401, "Access denied. No token provided"));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") {
            return next(new CustomError(403, "Access forbidden: Admins only"));
        }
        req.admin = {...decoded};
        next();
    } catch (ex) {
        return res.status(401).redirect("/admin/login");
    }
};
