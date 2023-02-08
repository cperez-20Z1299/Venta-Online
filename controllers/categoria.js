
const { response, request } = require('express');

const Categoria = require('../models/categoria');


const getCategoria = async (req = request, res = response) => {

    const query = { estado: true };

    const listaCategoria = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
    ]);

    res.json({
        msg: 'Get API de Categorias', listaCategoria
    });
}

const postCategoria = async (req = request, res = response) => {
    const { nombre, proveedor, tipo, estado } = req.body;

    const categoriaDB = new Categoria({ nombre, proveedor, tipo, estado });

    await categoriaDB.save();

    res.json({
        msg: 'POST API de Categoria',
        categoriaDB
    });
}

const putCategoria = async (req = request, res = response) => {
    const { id } = req.params;


    const { _id, estado, ...resto } = req.body;


    const categoriaEditada = await Categoria.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de Categoria',
        categoriaEditada
    });
}

const deleteCategoria = async (req = request, res = response) => {
    const { id } = req.params;


    const categoriaEliminada = await Categoria.findByIdAndDelete(id);
    res.json({
        msg: 'DELETE API de Categoria',
        categoriaEliminada
    });
}

module.exports = {
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria
}

