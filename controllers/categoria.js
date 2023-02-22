const { response, request } = require('express');

const Categoria = require('../models/categoria');

const getCategoria = async (req = request, res = response) => {

    const query = { estado: true };

    const listaCategoria = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).populate('usuario', 'nombre')
    ]);

    res.json({
        msg: 'Get API de Categorias', listaCategoria
    });
}

const getCategoriaPorId = async(req = request, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        msg: 'Categoria por id',
        categoria
    })

}

const postCategoria = async (req = request, res = response) => {
    const { nombre, descripcion, proveedor, tipo, estado } = req.body;

    const categoriaDB = new Categoria.findOne({ nombre});
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categorria ${categoriaDB.nombre}, ya existe en la DB`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoriaAgregada = new Categoria(data);
    await categoriaAgregada.save();

    res.json({
        msg: 'POST API de Categoria',
        categoriaAgregada
    });
}

const putCategoria = async (req = request, res = response) => {
    
    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id; 

    const categoriaEditada = await Categoria.findByIdAndUpdate(id, data, { new: true});

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
    getCategoriaPorId,
    postCategoria,
    putCategoria,
    deleteCategoria
}

