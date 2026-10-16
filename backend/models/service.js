const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    mainImg: {
        type: String, 
        required: true
    },
});

module.exports = mongoose.model("Service", ServiceSchema);
