const { Schema, model } = require("mongoose")

const FacturaSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    total:{
        type:Number,
        require: true,
    },
    detalles:{
        type: Array
    },
    fecha:{
        type: Date
    }
});

module.exports = model('Factura', FacturaSchema)