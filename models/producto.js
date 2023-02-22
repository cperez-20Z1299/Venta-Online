const{ Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    precio: {
        type: Number,
        required: true
    },
    fechaCaducidad: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    tamaño: {
        type: String,
        enum: [grande, mediano, pequeño]
    },
    stock: {
        type: number,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Producto',ProductoSchema)