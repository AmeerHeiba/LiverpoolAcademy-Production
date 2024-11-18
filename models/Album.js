const mongoose = require('mongoose');

// Schema for individual images in an album
const imageSchema = new mongoose.Schema({
  path: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

// Schema for albums, containing an array of images
const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  images: [imageSchema],  // Embedding image documents within the album
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Album', albumSchema);
