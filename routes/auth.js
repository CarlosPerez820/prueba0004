const {Router} = require('express');
const {check} = require('express-validator');
const { login, encuestas} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('password','La password es obligatorio').not().isEmpty(),
    validarCampos
],login );

router.post('/encuesta',[
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('password','La password es obligatorio').not().isEmpty(),
    validarCampos
],encuestas );

module.exports = router;