const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    photo: { type: String,default:"https://res.cloudinary.com/dukl6eyfn/image/upload/v1731658578/qu1egxfohrz355urthcw.jpg" },
    video: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("News", newsSchema);
