const { Router } = require('express');
const { check, query } = require('express-validator');
const { isValidRole, existEmail, existUserById } = require('../helpers/db-validators');
const { validarCampos } = require('../middleware/validar_campos');

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
        check('id', 'Invalid id').isMongoId().custom( existUserById ),
        check('role').custom( isValidRole ).optional(),
        validarCampos
], usuariosPut);

router.post('/', [
        check('name', 'Invalid name').not().isEmpty(),
        check('password', 'Invalid password').isLength(6),
        check('email', 'Invalid Email').isEmail().custom( existEmail ),
        //check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( isValidRole ),
        validarCampos
] , usuariosPost);  

router.delete('/:id', [
        check('id', 'Invalid id').isMongoId().custom( existUserById ),
        validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;


