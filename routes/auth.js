const { Router } = require('express');
const { body } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos');
const { login } = require('../controllers/auth');

const router =  Router();

router.post('/login', [
    body('email', 'Email required').isEmail(),
    body('password', 'Password required').not().isEmpty(),
    validarCampos
], login)

module.exports = router
