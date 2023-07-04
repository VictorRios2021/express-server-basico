const { Router } = require('express');
const { query, body, param } = require('express-validator');

const { 
        validarCampos,
        validarJWT,
        haveRole,
        isAdminRole
}  = require('../middleware')

const { isValidRole, existEmail, existUserById } = require('../helpers/db-validators');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', [
        query('limit', 'Invalid limit').isNumeric().optional(),
        query('skip', 'Invalid skip').isNumeric().optional(),
        validarCampos
],usuariosGet);

router.put('/:id',[
        param('id', 'Invalid id').isMongoId().custom( existUserById ),
        param('role').custom( isValidRole ).optional(),
        validarCampos
], usuariosPut);

router.post('/', [
        body('name', 'Invalid name').not().isEmpty(),
        body('password', 'Invalid password').isLength(6),
        body('email', 'Invalid Email').isEmail().custom( existEmail ),
        //check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        body('role').custom( isValidRole ),
        validarCampos
] , usuariosPost);  

router.delete('/:id', [
        validarJWT,
        //isAdminRole,
        haveRole('ADMIN_ROLE'),
        param('id', 'Invalid id').isMongoId().custom( existUserById ),
        validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;
