const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  Employeename_ar: { type: String, required: true }, // Arabic name
  Employeename_en: { type: String }, // Optional English name
  position_ar: { type: String, required: true }, // Arabic position
  position_en: { type: String }, // Optional English position
  role_ar: { type: String, required: true }, // Arabic role
  role_en: { type: String }, // Optional English role
  bio_ar: { type: String }, // Arabic bio
  bio_en: { type: String }, // Optional English bio
  email: { type: String },
  phone: { type: String },
  TshirtNo: { type: String },
  joinedAt: { type: Date, default: Date.now },
  photo: { type: String }
});

module.exports = mongoose.model("Staff", staffSchema);
