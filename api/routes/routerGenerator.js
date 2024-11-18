const express = require("express");
const { handleRequest } = require("../../controllers/baseController");
const routeConfig = require("../../config/routeConfig");

function generateRoutes(model) {
    const router = express.Router();

    // Loop through the routeConfig map and create routes
    Object.entries(routeConfig).forEach(([operation, { path, method }]) => {
        // Register the route with the specified method, path, and handler
        router[method](path, handleRequest(model, operation));
    });

    return router;
}

module.exports = generateRoutes;
