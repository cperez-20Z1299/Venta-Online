const {Router} = require('express');
const { getFactura, comprar, editarFactura, facturaPorId } = require('../controllers/factura');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, esClienteRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar',[
    validarJWT,
    //esAdminRole
], getFactura);

router.get('/comprar',[
    validarJWT
], comprar)

router.get('/facturaId/:id',[
    validarJWT
], facturaPorId)

router.put('/editarFactura/:idFactura',[
    validarJWT,
    esAdminRole
], editarFactura);

module.exports = router