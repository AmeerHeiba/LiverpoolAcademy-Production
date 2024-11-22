const Joi = require("joi");

const serviceSchema = {
    create: Joi.object({
        title_ar: Joi.string().required(),
        title_en: Joi.string().optional(),
        description_ar: Joi.string().required(),
        description_en: Joi.string().optional(),
        photo: Joi.string().uri().optional(),
        location_ar: Joi.string().required(),
        location_en: Joi.string().optional(),
        birthRangeFrom: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
        birthRangeTo: Joi.number().integer().greater(Joi.ref('birthRangeFrom')).max(new Date().getFullYear()).required(),
        sport_ar: Joi.string().valid("football", "basketball").required(),
        sport_en: Joi.string().valid("football", "basketball").optional(),
        trainingDays: Joi.string().required(),
        trainingTimeFrom: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
        trainingTimeTo: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
        oneMonth: Joi.string().default("30 KD").optional(),
        threeMonth: Joi.string().default("90 KD").optional(),
        brothers: Joi.string().default("30 KD").optional(),
    }),
    update: Joi.object({
        title_ar: Joi.string().optional(),
        title_en: Joi.string().optional(),
        description_ar: Joi.string().optional(),
        description_en: Joi.string().optional(),
        photo: Joi.string().uri().optional(),
        location_ar: Joi.string().optional(),
        location_en: Joi.string().optional(),
        birthRangeFrom: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional(),
        birthRangeTo: Joi.number().integer().greater(Joi.ref('birthRangeFrom')).max(new Date().getFullYear()).optional(),
        sport_ar: Joi.string().valid("football", "basketball").optional(),
        sport_en: Joi.string().valid("football", "basketball").optional(),
        trainingDays: Joi.string().optional(),
        trainingTimeFrom: Joi.string().pattern(/^\d{2}:\d{2}$/).optional(),
        trainingTimeTo: Joi.string().pattern(/^\d{2}:\d{2}$/).optional(),
        oneMonth: Joi.string().optional(),
        threeMonth: Joi.string().optional(),
        brothers: Joi.string().optional(),
    }),
    Id: Joi.object({
        id: Joi.string().hex().length(24).required(),
    }),
};

module.exports = serviceSchema;
