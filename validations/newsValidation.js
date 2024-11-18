const Joi = require("joi");

const newsSchema = {
    create: Joi.object({
        title: Joi.string().min(3).max(255).required(),
        content: Joi.string().min(3).required(),
        author: Joi.string().min(3).max(100),
        // Ensure at least one of these fields is provided, but allow both
        photo: Joi.alternatives().try(Joi.string().uri(), Joi.string().valid("")).optional(),
        video: Joi.alternatives().try(Joi.string().uri(), Joi.string().valid("")).optional(),
        createdAt: Joi.date(),
    }), 
    
    update: Joi.object({
        title: Joi.string().min(3).max(255),
        content: Joi.string().min(3),
        author: Joi.string().min(3).max(100),
        photo: Joi.alternatives().try(Joi.string().uri(), Joi.string().valid("")).optional(), // Allow photo to be omitted
        video: Joi.alternatives().try(Joi.string().uri(), Joi.string().valid("")).optional(), // Allow video to be omitted
        createdAt: Joi.date(),
    }),
    
    Id: Joi.object({
        id: Joi.string().hex().length(24).required()
    })
};

module.exports = newsSchema;
