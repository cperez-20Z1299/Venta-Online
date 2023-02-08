const{ Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    proveedor: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    tamaño: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Categoria',CategoriaSchema)