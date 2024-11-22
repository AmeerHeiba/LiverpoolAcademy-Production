const Joi = require("joi");

const staffSchema = {
    create: Joi.object({
        Employeename_ar: Joi.string().min(3).max(100).required(),
        Employeename_en: Joi.string().optional(),
        position_ar: Joi.string().min(2).max(100).required(),
        position_en: Joi.string().optional(),
        role_ar: Joi.string().min(2).required(),
        role_en: Joi.string().optional(),
        bio_ar: Joi.string().optional(),
        bio_en: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().pattern(/^(?:\+965)?[5692][0-9]{7}$/).optional(),
        TshirtNo: Joi.string().optional(),
        photo: Joi.string().uri().optional(),
        joinedAt: Joi.date().optional(),
    }),
    update: Joi.object({
        Employeename_ar: Joi.string().optional(),
        Employeename_en: Joi.string().optional(),
        position_ar: Joi.string().optional(),
        position_en: Joi.string().optional(),
        role_ar: Joi.string().optional(),
        role_en: Joi.string().optional(),
        bio_ar: Joi.string().optional(),
        bio_en: Joi.string().optional(),
        email: Joi.string().optional(),
        phone: Joi.string().optional(),
        TshirtNo: Joi.string().optional(),
        photo: Joi.string().optional(),
        joinedAt: Joi.date().optional(),
    }),
    Id: Joi.object({
        id: Joi.string().hex().length(24).required(),
    }),
};

module.exports = staffSchema;
