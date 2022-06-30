const mongoose = require('mongoose');

//category schema
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image_url:{
        type: String,
        required: false
    },
    author:{
        type: String,
        required: true
    },
    pages:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
},{timestamps:true});

module.exports = mongoose.model('Book', bookSchema);


