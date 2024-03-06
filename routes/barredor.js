const {Router} = require('express');
const {check} = require('express-validator');

const { barredoresGet, 
        barredoresPut, 
        barredoresPost, 
        barredoresDelete
     } = require('../controllers/barredor');

const { validarCampos } = require('../middlewares/validar-campos');
const { usuarioDisponible, existeBarredorID } = require('../helpers/db-validators');

const router = Router();

router.get('/', barredoresGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeBarredorID),
    validarCampos
],barredoresPut);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('usuario').custom(usuarioDisponible),
    check('ruta','La ruta es obligatoria').not().isEmpty(),
    check('password','La contraseña debe tener mas 5 caracteres').isLength({min:5}),
    validarCampos
],barredoresPost);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeBarredorID),
    validarCampos
], barredoresDelete);


module.exports = router ;