const Joi = require("joi");

const serviceSchema = {
    create: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        photo: Joi.string().uri().required(),
        location: Joi.string().min(3).required(), // Branch location
        birthRangeFrom: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
        birthRangeTo: Joi.number().integer().greater(Joi.ref('birthRangeFrom')).max(new Date().getFullYear()).required(),
        sport: Joi.string().required(),
        trainingDays: Joi.string().required(),
        trainingTimeFrom: Joi.string().required(), // HH:mm format
        trainingTimeTo: Joi.string().required(),
        oneMonth: Joi.string().required(),
        threeMonth: Joi.string().required(),
        brothers: Joi.string().required()
    }),
    update: Joi.object({
        title: Joi.string(),
        description: Joi.string(),
        photo: Joi.string().uri(),
        location: Joi.string().min(3),
        birthRangeFrom: Joi.number().integer().min(1900).max(new Date().getFullYear()),
        birthRangeTo: Joi.number().integer().greater(Joi.ref('birthRangeFrom')).max(new Date().getFullYear()),
        sport: Joi.string(),
        trainingDays: Joi.string(),
        trainingTimeFrom: Joi.string(),
        trainingTimeTo: Joi.string(),
        oneMonth: Joi.string(),
        threeMonth: Joi.string(),
        brothers: Joi.string()
    }),
    Id: Joi.object({
        id: Joi.string().hex().length(24).required()
    })
};

module.exports = serviceSchema;
