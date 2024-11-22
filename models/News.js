const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title_ar: { type: String, required: true }, // Arabic title
  title_en: { type: String }, // Optional English title
  content_ar: { type: String, required: true }, // Arabic content
  content_en: { type: String }, // Optional English content
  author: { type: String, required: true },
  photo: {
    type: String,
    default:
      "https://res.cloudinary.com/dukl6eyfn/image/upload/v1731658578/qu1egxfohrz355urthcw.jpg"
  },
  video: { type: String },
  createdAt: { type: Date, default: Date.now }
});

newsSchema.index({ title_ar: "text", content_ar: "text" }, { default_language: "arabic" });

module.exports = mongoose.model("News", newsSchema);
