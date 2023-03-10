const { response, request } = require('express');

const Producto = require('../models/producto');

const getProducto = async (req = request, res = response) => {

    const query = { estado: true };

    const listaProducto = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('usuario', 'nombre').populate('categoria','nombre')
    ]);

    res.json({
        msg: 'Get API de Productos', listaProducto
    });
}

const getProductoPorNombreCategoria = async(req = request, res = response) => {

    const { idProductoCategoria } = req.params;
    const query = { categoria: idProductoCategoria }

    const listaProducto = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('categoria', 'nombre')
    ]);

    res.json({
        msg: 'Categoria por id',
        listaProducto
    })
}

const getProductoPorNombre = async(req = request, res = response) => {

    const {nombre} = req.body;

    const buscarProducto = await Producto.findOne({nombre}).populate('categoria', 'nombre')

    res.json({
        buscarProducto
    })
}

const getProductoMasVendido = async(req = request, res = response) => {

    const verProducto = await Producto.find().sort({vendidos: -1}).limit(10);

    res.status(201).json({
        msg: "Productos más Vendidos:",
        verProducto
    })
}

const getProductoAgotado = async(req = request, res = response) => {

    const query = { estado: false };

    const listaProdcutos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('categoria', 'nombre')
    ]);

    res.json({
        listaProdcutos
    });
}

const postProducto = async (req = request, res = response) => {
                                // Operador spread
    const { estado, usuario, ...body } = req.body;

    //Validacion si existe un producto en la DB
    const productoEnDB = await Producto.findOne({nombre: body.nombre});
    if(productoEnDB){
        return res.status(400).json({
            msj: `El producto ${productoEnDB} ya existe en la DB`
        });
    }

    //Generar data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json({
        msg: 'Post de producto',
        producto
    });
}

const putProducto = async (req = request, res = response) => {
    
    const { id } = req.params;
    const {_id, estado, usuario, ...data} = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id; //Hacemos referencia al usuario que hizo el put por medio del token

    const productoEditado = await Producto.findByIdAndUpdate(id, data, { new: true});

    res.json({
        msg: 'PUT API de Productos',
        productoEditado
    });
}

const deleteProducto = async (req = request, res = response) => {
    
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});
    
    res.json({
        msg: 'DELETE API de Productos',
        productoBorrado
    });
}

module.exports = {
    getProducto,
    getProductoPorNombre,
    getProductoPorNombreCategoria,
    getProductoMasVendido,
    getProductoAgotado,
    postProducto,
    putProducto,
    deleteProducto
}