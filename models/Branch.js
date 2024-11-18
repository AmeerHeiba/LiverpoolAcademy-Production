const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    branchName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    location: { type: String },
    photo: { type: String },
    Programs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Program" }],
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Branch", branchSchema);

