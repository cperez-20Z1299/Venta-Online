const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const Role = require('../models/role');

const getUsuarios = async (req = request, res = response) => {

    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'GET API de usuarios',
        listaUsuarios
    });
}

const postUsuario = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password, rol });

    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    await usuarioDB.save();

    res.status(201).json({
        msg: 'POST API de usuario',
        usuarioDB
    });
}

const putUsuario = async (req = request, res = response) => {

    const { id } = req.params;

    //Ignoramos el _id, rol, estado y google al momento de editar y mandar la petición en el req.body
    const { _id, rol, estado, ...resto } = req.body;

    const rolDB = await Role.findOne({rol: 'ADMIN_ROLE'})
    const usuario = await Usuario.findOne({_id: id})
    if (usuario.rol == rolDB.rol) {
        return res.status(401).json({
            msg: "No se puede editar un admin"
        });
    }

    // //Encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    //editar y guardar
    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de usuario',
        usuarioEditado
    });
}

const PutCliente = async (req = request, res = response) => {
    const {id} = req.params;
    const usuarioId = req.usuario.id;
    if(id === usuarioId){
        const {_id, estado, rol, ...resto} = req.body;

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(resto.password, salt);
    
        const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);
        res.json({
            msg: 'Usuario editado',
            usuarioEditado
        })
    } else{
        return res.status(401).json({
            msg: 'No tienes permiso para editar este usuario'
        })
    }
}

const deleteUsuario = async (req = request, res = response) => {
    const { id } = req.params;
    const rolDB = await Role.findOne({rol: 'ADMIN_ROLE'})
    const usuario = await Usuario.findOne({_id: id})
    if (usuario.rol == rolDB.rol) {
        return res.status(401).json({
            msg: "No se puede eliminar a un admin"
        });
    }
    //eliminar fisicamente y guardar
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    // O bien cambiando el estado del usuario

    //editar y guardar
    //const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE API de usuario',
        usuarioEliminado
    });
}

const borrarCliente = async (req = request, res = response) => {
    const { id } = req.params;

    const usuario = req.usuario._id;

    const idUsuario = usuario.toString();

    if (id === idUsuario) {
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'usuario borrado',
            usuarioEliminado
        })
    } else {
        res.status(401).json({
            msg: 'no puedes borrar cuentas de alguien mas'

        })
    }

}

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    PutCliente,
    deleteUsuario,
    borrarCliente
}