const {Router} = require('express');
const {check} = require('express-validator');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete
     } = require('../controllers/usuario');

const { validarCampos } = require('../middlewares/validar-campos');
const { correoDisponible, existeUsuarioID } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioID),
    validarCampos
],usuariosPut);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('rol','El rol es obligatorio').not().isEmpty(),
    check('correo','Correo no valido').isEmail(),
    check('correo').custom(correoDisponible),
    check('password','La contraseña debe tener mas 6 caracteres').isLength({min:6}),
    validarCampos
],usuariosPost);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioID),
    validarCampos
], usuariosDelete);


module.exports = router ;