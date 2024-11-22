const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  branchName_ar: { type: String, required: true }, // Arabic branch name
  branchName_en: { type: String }, // Optional English branch name
  address_ar: { type: String, required: true }, // Arabic address
  address_en: { type: String }, // Optional English address
  phone: { type: String, required: true },
  email: { type: String },
  location: { type: String },
  photo: { type: String },
  Programs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Program" }],
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Branch", branchSchema);
