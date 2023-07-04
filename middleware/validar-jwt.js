const jwt =  require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async ( req, res, next) => {
    const token = req.header('x-token');
    if(!token) return res.status(401),json({'msg': 'Token required'})
    
    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const userAuth  = await Usuario.findById(uid);

        if( !userAuth ) {
            return res.status(401).json({
                msg: 'Invalid user/token'
            })
        }

        if( !userAuth.status) {
            return res.status(401).json({
                msg: 'Invalid token'
            });
        }

        req.user =  userAuth;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
}

module.exports = {
    validarJWT
}
