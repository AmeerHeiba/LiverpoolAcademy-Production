const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title_ar: { type: String, required: true }, // Arabic title
  title_en: { type: String }, // Optional English title
  content_ar: { type: String }, // Arabic content
  content_en: { type: String }, // Optional English content
  year: { type: Number, required: true },
  photo: { type: String },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

storySchema.index({ title_ar: "text", content_ar: "text" }, { default_language: "arabic" });

module.exports = mongoose.model("Story", storySchema);
