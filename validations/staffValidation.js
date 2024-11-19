const Joi = require("joi");

const staffSchema = {
    create: Joi.object({
        Employeename: Joi.string().min(3).max(100).required(),
        position: Joi.string().min(2).max(100).required(),
        email: Joi.string().email(),
        role: Joi.string().min(2),
        bio: Joi.string(),
        phone: Joi.string().pattern(/^(?:\+965)?[5692][0-9]{7}$/),
        TshirtNo : Joi.number().min(1).max(99),
        photo : Joi.string().uri(),
        joinedAt: Joi.date()
    }),
    update: Joi.object({
        Employeename: Joi.string().min(3).max(100),
        position: Joi.string().min(2).max(100),
        email: Joi.string().email(),
        role: Joi.string().min(2),
        bio: Joi.string(),
        phone: Joi.string().pattern(/^(?:\+965)?[5692][0-9]{7}$/),
        TshirtNo : Joi.number().min(1).max(99),
        photo : Joi.string().uri(),
        joinedAt: Joi.date()
    }),
    Id: Joi.object({
        id: Joi.string().hex().length(24).required()
    })
};

module.exports = staffSchema;
