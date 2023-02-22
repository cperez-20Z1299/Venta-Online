const{ Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: true
    },
    proveedor: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: [true, 'El tipo es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = model('Categoria',CategoriaSchema)