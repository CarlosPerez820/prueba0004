const {Router} = require('express');
const {check} = require('express-validator');

const { encuestasGet, 
        peticionesGet,
        encuestaEspecificaGet,
        encuestasPut, 
        encuestasPost, 
        encuestasDelete
     } = require('../controllers/encuesta');

const { validarCampos } = require('../middlewares/validar-campos');
const { usuarioDisponible, existeEncuestaID } = require('../helpers/db-validators');

const router = Router();

router.get('/', encuestasGet);

router.get('/peticiones', peticionesGet);

router.get('/especifica/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeEncuestaID),
    validarCampos
],encuestaEspecificaGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeEncuestaID),
    validarCampos
],encuestasPut);

router.post('/',[
    check('fecha','La fecha es obligatorio').not().isEmpty(),
    check('hora','La hora es obligatoria').not().isEmpty(),
    check('latitud','La latitud es obligatoria').not().isEmpty(),
    check('longitud','La longitud es obligatoria').not().isEmpty(),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('colonia','La colonia es obligatoria').not().isEmpty(),
    check('respuesta1','La respues1 es obligatoria').not().isEmpty(),
    check('respuesta2','La respues2 es obligatoria').not().isEmpty(),
    check('respuesta3','La respues3 es obligatoria').not().isEmpty(),
    check('respuesta4','La respues4 es obligatoria').not().isEmpty(),
    check('peticion','La peticion es obligatoria').not().isEmpty(),
    check('nombre','El nombre es obligatoria').not().isEmpty(),
    check('telefono','El telefon es obligatoria').not().isEmpty(),
    validarCampos
],encuestasPost);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeEncuestaID),
    validarCampos
], encuestasDelete);


module.exports = router ;