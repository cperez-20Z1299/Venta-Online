const { Router } = require('express');
const { getFactura, postFactura, putFactura, deleteFactura } = require('../controllers/factura');

const router = Router();

router.get('/mostrar', getFactura)
router.post('/agregar', postFactura)
router.put('/editar/:id', putFactura)
router.delete('/eliminar/:id', deleteFactura)

module.exports = router;