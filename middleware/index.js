
const  validarCampos = require('../middleware/validar-campos');
const validaRoles = require('../middleware/validar-roles');
const validarJWT = require('../middleware/validar-jwt');

module.exports = {
    ...validarCampos,
    ...validaRoles,
    ...validarJWT,
}
