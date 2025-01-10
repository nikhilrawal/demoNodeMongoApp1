const mongoose = require('mongoose')


const menuschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    taste: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
});
Menu = mongoose.model('Menu', menuschema)
module.exports = Menu