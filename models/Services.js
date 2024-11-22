const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title_ar: { type: String, required: true }, // Arabic title
  title_en: { type: String }, // Optional English title
  description_ar: { type: String, required: true }, // Arabic description
  description_en: { type: String }, // Optional English description
  photo: { type: String },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  location_ar: { type: String, required: true }, // Arabic location
  location_en: { type: String }, // Optional English location
  birthRangeFrom: { type: String, required: true },
  birthRangeTo: { type: String, required: true },
  sport_ar: { type: String, required: true }, // Arabic sport name
  sport_en: { type: String }, // Optional English sport name
  trainingDays: { type: String, required: true },
  trainingTimeFrom: { type: String, required: true },
  trainingTimeTo: { type: String, required: true },
  oneMonth: { type: String, default: "30 KD" },
  threeMonth: { type: String, default: "90 KD" },
  brothers: { type: String, default: "30 KD" }
});

module.exports = mongoose.model("Service", serviceSchema);
