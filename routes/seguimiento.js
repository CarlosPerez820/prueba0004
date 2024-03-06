const {Router} = require('express');
const {check} = require('express-validator');

const { seguimientosGet, 
        seguimientosPut, 
        seguimientosPost, 
        seguimientosDelete,
        seguimientoEncuestaGet
     } = require('../controllers/seguimiento');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeSeguimientoID , existePeticionID, existeEncuestaID} = require('../helpers/db-validators');

const router = Router();

router.get('/', seguimientosGet);

router.get('/notas/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeEncuestaID),
    validarCampos
],seguimientoEncuestaGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeSeguimientoID),
    validarCampos
],seguimientosPut);

router.post('/',[
    check('id_peticion', 'No es un ID valido').isMongoId(),
    check('id_peticion').custom( existePeticionID),
    check('fecha','La fecha es obligatorio').not().isEmpty(),
    check('hora','La hora es obligatorio').not().isEmpty(),
    check('nota','Las notas son obligatorias').not().isEmpty(),
    validarCampos
],seguimientosPost);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeSeguimientoID),
    validarCampos
], seguimientosDelete);


module.exports = router ;