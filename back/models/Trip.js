const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, },
    duration: { type: String, required: true },
    rating: { type: Number, required: true },
    tags: [String]
});

module.exports = mongoose.model('Trip', tripSchema)