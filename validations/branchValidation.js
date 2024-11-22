const Joi = require("joi");

const branchSchema = {
    create: Joi.object({
        branchName_ar: Joi.string().min(3).max(100).required(),
        branchName_en: Joi.string().max(100).optional(),
        address_ar: Joi.string().min(3).required(),
        address_en: Joi.string().optional(),
        phone: Joi.string().pattern(/^(?:\+965)?[5692][0-9]{7}$/).required(),
        email: Joi.string().email().optional(),
        location: Joi.string().optional(),
        photo: Joi.string().uri().optional(),
    }),
    update: Joi.object({
        branchName_ar: Joi.string().min(3).max(100).optional(),
        branchName_en: Joi.string().optional(),
        address_ar: Joi.string().min(3).optional(),
        address_en: Joi.string().optional(),
        phone: Joi.string().pattern(/^(?:\+965)?[5692][0-9]{7}$/).optional(),
        email: Joi.string().email().optional(),
        location: Joi.string().optional(),
        photo: Joi.string().uri().optional(),
    }),
    Id: Joi.object({
        id: Joi.string().hex().length(24).required(),
    }),
};

module.exports = branchSchema;
