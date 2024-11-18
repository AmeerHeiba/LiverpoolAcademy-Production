const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    Employeename: { type: String, required: true },
    position: { type: String, required: true },
    role:{ type: String, required: true },
    email: { type: String },
    phone: { type: String },
    TshirtNo: { type: String },
    joinedAt: { type: Date, default: Date.now },
    photo: { type: String },
});

module.exports = mongoose.model("Staff", staffSchema);
