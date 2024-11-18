const { array } = require("joi");
const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
    game: { type: String, required: true },
    minAge: { type: Number, required: true },
    maxAge: { type: Number, required:true},
    days: { type: [String], required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    oneMonthFee: { type: Number, required: true },
    threeMonthFee: { type: Number, required: true },
    brothersOfferFee: { type: Number, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Program", programSchema);