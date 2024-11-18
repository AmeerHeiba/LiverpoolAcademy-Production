const Joi = require("joi");

const branchSchema = {
    create: Joi.object({
        branchName: Joi.string().min(3).max(100).required(),
        address: Joi.string().min(3).required(),
        phone: Joi.string().pattern(/^(?:\+965)?[5692][0-9]{7}$/).required(),
        phone: Joi.string(),
        email: Joi.string().email().required(),
        location: Joi.string(),
        photo: Joi.string().uri()
    }),
    update: Joi.object({
        branchName: Joi.string().min(3).max(100),
        address: Joi.string().min(3),
        phone: Joi.string().pattern(/^(?:\+965)?[5692][0-9]{7}$/),
        email: Joi.string().email(),
        location: Joi.string(),
        photo: Joi.string().uri()

    }),
    Id: Joi.object({
        id: Joi.string().hex().length(24).required()
    })
};

module.exports = branchSchema;
