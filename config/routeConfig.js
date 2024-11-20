const { filter } = require("compression");

module.exports = {
    getAll: { path: "/", method: "get" },
    getById: { path: "/:id", method: "get" },
    add: { path: "/", method: "post" },
    update: { path: "/:id", method: "put" },
    delete: { path: "/:id", method: "delete" },
    filter: { path: "/filter", method: "post" },
};
