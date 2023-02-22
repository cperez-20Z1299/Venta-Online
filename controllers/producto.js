const { response, request } = require('express');

const Producto = require('../models/producto');

const getProducto = async (req = request, res = response) => {

    const query = { estado: true };

    const listaProducto = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
    ]);

    res.json({
        msg: 'Get API de Productos', listaProducto
    });
}

const postProducto = async (req = request, res = response) => {
    const { nombre, descripcion, proveedor, tipo, estado } = req.body;

    const productoDB = new Producto({ nombre, precio, fechaCaducidad, tamaño, stock, estado });

    await productoDB.save();

    res.json({
        msg: 'POST API de Productos',
        productoDB
    });
}

const putProducto = async (req = request, res = response) => {
    const { id } = req.params;

    const { _id, estado, ...resto } = req.body;

    const productoEditado = await Producto.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de Productos',
        productoEditado
    });
}

const deleteProducto = async (req = request, res = response) => {
    const { id } = req.params;

    const productoEliminado = await Producto.findByIdAndDelete(id);
    res.json({
        msg: 'DELETE API de Productos',
        productoEliminado
    });
}

module.exports = {
    getProducto,
    postProducto,
    putProducto,
    deleteProducto
}