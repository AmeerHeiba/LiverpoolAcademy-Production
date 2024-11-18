
const Joi = require("joi");

const albumSchema = {
    create: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().optional(),
        images: Joi.array().items(
            Joi.object({
                path: Joi.string().uri().required(),
                caption: Joi.string().optional(),
                uploadedAt: Joi.date().optional()
            })
        )
    }), 
    
    update: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().optional(),
        images: Joi.array().items(
            Joi.object({
                path: Joi.string().uri().required(),
                caption: Joi.string().optional(),
                uploadedAt: Joi.date().optional()
            })
        )
    }),
    
    Id: Joi.object({
        id: Joi.string().hex().length(24).required()
    })
};

module.exports = albumSchema;
