const mongoose = require('mongoose');

// Schema for individual images in an album
const imageSchema = new mongoose.Schema({
  path: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

// Schema for albums
const albumSchema = new mongoose.Schema({
  title_ar: { type: String, required: true }, // Arabic title
  title_en: { type: String }, // Optional English title
  description_ar: { type: String, required: true }, // Arabic description
  description_en: { type: String }, // Optional English description
  author: { type: String, required: true },
  images: [imageSchema], // Embedding image documents within the album
  createdAt: { type: Date, default: Date.now }
});

// Index for Arabic text search
albumSchema.index({ title_ar: "text", description_ar: "text" }, { default_language: "arabic" });

module.exports = mongoose.model('Album', albumSchema);
