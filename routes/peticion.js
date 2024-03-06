const {Router} = require('express');
const {check} = require('express-validator');

const { peticionesGet, 
        peticionesPut, 
        peticionesPost, 
        peticionesDelete
     } = require('../controllers/peticion');

const { validarCampos } = require('../middlewares/validar-campos');
const { existePeticionID } = require('../helpers/db-validators');

const router = Router();

router.get('/', peticionesGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existePeticionID),
    validarCampos
],peticionesPut);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('telefono','El telefono es obligatorio').not().isEmpty(),
    check('peticiones','Las peticiones son obligatorias').not().isEmpty(),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('latitud','La latitud es obligatoria').not().isEmpty(),
    check('longitud','La longitud es obligatoria').not().isEmpty(),
    check('barredor','La barredor es obligatoria').not().isEmpty(),
    check('estado','La estado es obligatoria').not().isEmpty(),
    check('anotaciones','La anotaciones es obligatoria').not().isEmpty(),

    validarCampos
],peticionesPost);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existePeticionID),
    validarCampos
], peticionesDelete);


module.exports = router ;