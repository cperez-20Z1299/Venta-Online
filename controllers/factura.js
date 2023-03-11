const { response, request } = require('express');
const Factura = require('../models/factura');
const Carrito = require('../models/carrito');
const Producto = require('../models/producto');

const getFactura = async (req = request, res = response) => {
    const factura = await Promise.all([
        Factura.countDocuments(),
        Factura.find()
    ])

    res.json({
        msg: 'Facturas encontradas',
        factura
    })
}

const facturaPorId = async (req = request, res = response) => {
    const { id } = req.params;
    const usuario = req.usuario._id;
    const carrito = await Carrito.findOne({ usuario: usuario });
    const detalles = carrito.producto;
    const facturaId = new Factura({ usuario, detalles });

    res.status(201).json({
        msg: 'GET Facturas por ID',
        facturaId
    });
}

const editarFactura = async (req = request, res = response) => {
    const { idFactura } = req.params;
    const factura = await Factura.findById(idFactura)
        .populate('usuario', 'detalles');

    const { _id, ...data } = req.body;
    data.usuario = req.usuario._id; //hacemos referencia al usuario que hizo el put por medio del token

    //Edición de categoria                                         // new: true Sirve para enviar el nuevo documento actualizado     
    const producto = await Factura.findByIdAndUpdate(factura, data, { new: true });

    res.json({
        msg: 'Factura editada',
        producto
    });
}

const comprar = async (req = request, res = response) => {
    const usuario = req.usuario._id;
    const carrito = await Carrito.findOne({ usuario: usuario });
    const total = carrito.subtotal;
    const detalles = carrito.producto;
    const facturaDB = new Factura({ usuario, total, detalles });

    await facturaDB.save();

    res.status(201).json({
        msg: 'Factura',
        facturaDB
    })
}

module.exports = {
    getFactura,
    editarFactura,
    comprar,
    facturaPorId
}