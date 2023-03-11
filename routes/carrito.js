const {Router} = require('express');
const { check } = require('express-validator');
const { getCarrito, postCarrito, agregarAlCarrito } = require('../controllers/carrito');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/mostrar', getCarrito);

router.put('/agregarProducto/:idProducto',[
    validarJWT,
    check('idProducto', 'No es un ID valido de mongo').isMongoId(),
    validarCampos
], agregarAlCarrito);

router.post('/agregar',[
    validarJWT
], postCarrito);

module.exports = router;