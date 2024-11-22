const Joi = require("joi");

const newsSchema = {
    create: Joi.object({
        title_ar: Joi.string().min(3).max(255).required(),
        title_en: Joi.string().optional(),
        content_ar: Joi.string().min(3).required(),
        content_en: Joi.string().optional(),
        photo: Joi.string().uri().optional(),
        video: Joi.string().uri().optional(),
    }),
    update: Joi.object({
        title_ar: Joi.string().min(3).max(255).optional(),
        title_en: Joi.string().optional(),
        content_ar: Joi.string().min(3).optional(),
        content_en: Joi.string().optional(),
        photo: Joi.string().uri().optional(),
        video: Joi.string().uri().optional(),
    }),
    Id: Joi.object({
        id: Joi.string().hex().length(24).required(),
    }),
};

module.exports = newsSchema;
