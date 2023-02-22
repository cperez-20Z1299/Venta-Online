const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getCategoria,getCategoriaPorId, postCategoria, putCategoria, deleteCategoria } = require('../controllers/categoria');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', getCategoria);

router.get('/:id', [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],getCategoriaPorId);

router.post('/agregar', [
    validarJWT,
    check('nombre','El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampos
], postCategoria);

router.put('/editar/:id',[
    validarJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    check('nombre','El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampos
], putCategoria);

router.delete('/eliminar/:id', deleteCategoria)

module.exports = router;