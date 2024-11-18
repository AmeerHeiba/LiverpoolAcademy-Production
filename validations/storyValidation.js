const Joi = require("joi");

const storySchema = {
    create: Joi.object({
        title: Joi.string().min(3).max(100).required(),
        year: Joi.number().required(),
        content: Joi.string().min(3).required(),
        photo: Joi.string().uri().required(),
        author: Joi.string().min(3).max(100)
    }),
    update: Joi.object({
        title: Joi.string().min(3).max(100),
        year: Joi.number(),
        content: Joi.string().min(3),
        photo: Joi.string().uri(),
        author: Joi.string().min(3).max(100),
    }),
    Id: Joi.object({
        id: Joi.string().hex().length(24).required()
    })
};

module.exports = storySchema;