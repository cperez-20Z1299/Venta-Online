const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

//Controladores
const { getProducto, getProductoPorNombre, getProductoMasVendido, getProductoAgotado,  postProducto, putProducto, deleteProducto, getProductoPorNombreCategoria} = require('../controllers/producto');
const { existeProductoPorId, existeCategoriaPorId, existeProducto, productoExiste, categoriaExiste } = require('../helpers/db-validator');

const router = Router();

//Obtener todas las categorias - publico
router.get('/', getProducto);

//Obtener un producto por el nombre - publico
router.get('/productosPorNombre', [
    check('nombre').custom(existeProducto),
    validarCampos
], getProductoPorNombre);

//Obtener un producto por el nombre de la categoria- publico
router.get('/productosPorNombreCategoria/:idProductoCategoria', [
    check('nombre').custom(categoriaExiste),
    validarCampos
], getProductoPorNombreCategoria);

//Obtener el producto mas vendido
router.get('/productoMasVendido', [
    
], getProductoMasVendido);

//Obtener productos agotados
router.get('/productosAgotados', [
    validarJWT,
    esAdminRole
], getProductoAgotado);

//Crear producto - privado - cualquier persona con un token valido
router.post('/agregar', [
    validarJWT,
    esAdminRole,
    check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
    check('nombre').custom(productoExiste),
    check('precio','El precio es obligatorio').isInt(),
    check('categoria').custom( existeCategoriaPorId ),
    check('categoria','Este espacio no debe de ir vacio').not().isEmpty(),
    validarCampos
], postProducto);

//Actualizar producto - privado - se requiere id y un token valido
router.put('/editar/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    check('categoria').custom( existeCategoriaPorId ),
    check('categoria','Este espacio no debe de ir vacio').not().isEmpty(),
    check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
    validarCampos
], putProducto);

// Borrar un producto - privado - se requiere id y un token valido - solo el admin puede borrar
router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], deleteProducto);

module.exports = router;