const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    location: { type: String, required: true }, 
    birthRangeFrom: { type: String, required: true },
    birthRangeTo: { type: String, required: true },
    sport: {type: String, required: true},
    trainingDays: {type: String,required: true},
    trainingTimeFrom: { type: String, required: true }, // Use String for 'HH:mm' format
    trainingTimeTo: { type: String, required: true } ,   // Use String for 'HH:mm' format
    oneMonth: { type: String, default: '30 KD' },
    threeMonth: { type: String, default: '90 KD' },
    brothers: { type: String, default: '30 KD' }

});

module.exports = mongoose.model('Service', serviceSchema);
