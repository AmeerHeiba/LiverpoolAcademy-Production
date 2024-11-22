const Joi = require("joi");

const storySchema = {
    create: Joi.object({
        title_ar: Joi.string().required(),
        title_en: Joi.string().optional(),
        content_ar: Joi.string().optional(),
        content_en: Joi.string().optional(),
        year: Joi.number().required(),
        photo: Joi.string().uri().optional(),
    }),
    update: Joi.object({
        title_ar: Joi.string().optional(),
        title_en: Joi.string().optional(),
        content_ar: Joi.string().optional(),
        content_en: Joi.string().optional(),
        year: Joi.number().optional(),
        photo: Joi.string().uri().optional(),
    }),
    Id: Joi.object({
        id: Joi.string().hex().length(24).required(),
    }),
};

module.exports = storySchema;
