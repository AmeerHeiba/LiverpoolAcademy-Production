const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    content: { type: String},
    photo: { type: String },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Story", storySchema);
