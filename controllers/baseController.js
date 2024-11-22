// /controllers/baseController.js
const CustomError = require("../utils/CustomError");
const { createService } = require("../services/ServicesGenerator");

exports.handleRequest = (model, operation) => async (req, res, next = (err) => res.status(500).json({ error: err.message || "An error occurred" })) => {
    try {
        const serviceFunction = createService(operation, model);

        const operationMap = {
            getAll: async () => {
                const results = await serviceFunction(req.lang);
                res.status(200).json(results);
            },
            getById: async () => {
                const itemId = req.params.id;
                const result = await serviceFunction(itemId, req.lang);
                if (!result) return next(new CustomError(404, `${model.modelName} not found`));
                res.status(200).json(result);
            },
            add: async () => {
                const data = { ...req.body, author: req.admin.email };
                const result = await serviceFunction(data);
                res.status(201).json({ status: "success", data: result });
            },
            update: async () => {
                const updateId = req.params.id;
                const result = await serviceFunction(updateId, req.body);
                if (!result) return next(new CustomError(404, `${model.modelName} not found`));
                res.status(200).json({ message: `${model.modelName} updated successfully`, data: result });
            },
            delete: async () => {
                const deleteId = req.params.id;
                const result = await serviceFunction(deleteId);
                if (!result) return next(new CustomError(404, `${model.modelName} not found`));
                res.status(200).json({ message: `${model.modelName} deleted successfully` });
            },
            addImageToAlbum: async () => {
                const albumId = req.params.id;
                const imageData = req.body; 
                const result = await serviceFunction(albumId, imageData);
                res.status(200).json({ message: `Image added to ${model.modelName} successfully`, data: result });
            },
            deleteImageFromAlbum: async () => {
                const albumId = req.params.id;
                const imageId = req.params.imageId; 
                const result = await serviceFunction(albumId, imageId);
                res.status(200).json({ message: `Image removed from ${model.modelName} successfully`, data: result });
            },
            getCount: async () => {
                const result = await serviceFunction();
                res.status(200).json(result);
            },
            filter: async () => {
                const filterConditions = req.body;
                const result = await serviceFunction(filterConditions);
                res.status(200).json(result);
            },
        };

        if (!operationMap[operation]) {
            throw new CustomError(400, "Invalid operation");
        }

        await operationMap[operation]();

    } catch (error) {
        next(new CustomError(500, error.message || "An error occurred"));
    }
};
