module.exports = {
    getAll: { path: "/", method: "get" },
    getById: { path: "/:id", method: "get" },
    add: { path: "/", method: "post" },
    update: { path: "/:id", method: "put" },
    delete: { path: "/:id", method: "delete" }
};
