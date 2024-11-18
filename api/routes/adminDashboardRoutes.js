// /routes/adminDashboardRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");
const authenticateAdmin = require("../../middlewares/authenticateAdmin");
const validate = require("../../middlewares/validate");

// Models
const Branch = require("../../models/Branch");
const News = require("../../models/News");
const Staff = require("../../models/Staff");
const Service = require("../../models/Services");
const Story = require("../../models/Story");
const Album = require("../../models/Album");

// Validation schemas for each model
const branchSchema = require("../../validations/branchValidation");
const newsSchema = require("../../validations/newsValidation");
const staffSchema = require("../../validations/staffValidation");
const serviceSchema = require("../../validations/serviceValidation");
const storySchema = require("../../validations/storyValidation");
const albumSchema = require("../../validations/albumValidation");
const { handleRequest } = require("../../controllers/baseController");

// Mapping modelType to their validation schema
const validationSchemas = {
    branch: branchSchema,
    news: newsSchema,
    staff: staffSchema,
    service: serviceSchema,
    story: storySchema,
    album: albumSchema
};

// Mapping modelType to their models
const models = {
    branch: Branch,
    news: News,
    staff: Staff,
    service: Service,
    story: Story,
    album: Album
};

// Dashboard route
router.get("/", authenticateAdmin, (req, res) => {
    adminController.renderDashboard(req, res);
});

router.get("/album/:id/images", authenticateAdmin,adminController.renderAlbumImages);
router.post("/album/:id/image/", authenticateAdmin,handleRequest(Album, 'addImageToAlbum'));
router.delete("/album/:id/image/:imageId", authenticateAdmin,handleRequest(Album, 'deleteImageFromAlbum'));

// Render dynamic form for adding or updating models
router.get("/:modelType/add", authenticateAdmin, (req, res) => {
    req.params.formMethod = "POST"; // Set form method for 'add' action
    adminController.renderDynamicForm(req, res, "POST");
});

router.get("/:modelType/update/:id", authenticateAdmin, (req, res) => {
    req.params.formMethod = "PUT"; // Set form method for 'edit' action
    adminController.renderDynamicForm(req, res, "PUT");
});

// Render dynamic view page for models
router.get("/:modelType/view", authenticateAdmin, (req, res) => {
    adminController.renderViewPage(req, res);
});

// Define dynamic CRUD routes for models
router.post("/:modelType/", authenticateAdmin, validateDynamic("create"), (req, res, next) => {
    handleRequest(models[req.params.modelType], 'add')(req, res, next);
});

router.post("/:modelType/:id", authenticateAdmin, validateDynamic("update"), (req, res, next) => {
    handleRequest(models[req.params.modelType], 'update')(req, res, next);
});

router.delete("/:modelType/:id", authenticateAdmin, (req, res, next) => {
    handleRequest(models[req.params.modelType], 'delete')(req, res, next);
});

// Validation function that dynamically loads the correct schema based on modelType
function validateDynamic(action) {
    return (req, res, next) => {
        const { modelType } = req.params;
        const schema = validationSchemas[modelType];

        if (!schema) {
            return res.status(400).json({ error: `Validation schema for '${modelType}' not found.` });
        }

        const validation = schema[action];
        if (!validation) {
            return res.status(400).json({ error: `Validation for '${action}' action not defined for '${modelType}'.` });
        }

        validate(validation)(req, res, next);
    };
}

module.exports = router;
