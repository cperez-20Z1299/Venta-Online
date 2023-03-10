const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getCategoria,getCategoriaPorId, postCategoria, putCategoria, deleteCategoria } = require('../controllers/categoria');
const { esAdminRole } = require('../middlewares/validar-roles');
const { existeCategoriaPorId } = require('../helpers/db-validator');

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

router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], deleteCategoria);

module.exports = router;