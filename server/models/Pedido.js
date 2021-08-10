const mongoose = require('mongoose');

const PedidoSchema = mongoose.Schema({
    pedido: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cliente'
    },
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    estado: {
        type: String,
        default: "Pendiente"
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Pedido', PedidoSchema);