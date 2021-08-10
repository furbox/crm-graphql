const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    existencia: {
        type: Number,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        trim: true
    },
}, {
    versionKey: false,
    timestamps: true
});

ProductoSchema.index({
    nombre: 'text'
});

module.exports = mongoose.model('Producto', ProductoSchema);