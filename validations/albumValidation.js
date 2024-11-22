const Joi = require("joi");

const albumSchema = {
    create: Joi.object({
        title_ar: Joi.string().required(),
        title_en: Joi.string().optional(),
        description_ar: Joi.string().required(),
        description_en: Joi.string().optional(),
        images: Joi.array().items(
            Joi.object({
                path: Joi.string().uri().required(),
                caption: Joi.string().optional(),
                uploadedAt: Joi.date().optional(),
            })
        ).optional()
    }),
    update: Joi.object({
        title_ar: Joi.string().optional(),
        title_en: Joi.string().optional(),
        description_ar: Joi.string().optional(),
        description_en: Joi.string().optional(),
        images: Joi.array().items(
            Joi.object({
                path: Joi.string().uri().optional(),
                caption: Joi.string().optional(),
                uploadedAt: Joi.date().optional(),
            })
        ).optional()
    }),
    Id: Joi.object({
        id: Joi.string().hex().length(24).required(),
    }),
};

module.exports = albumSchema;
