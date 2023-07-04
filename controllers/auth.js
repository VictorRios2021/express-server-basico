const { response } = require("express");
const bcryptjs = require('bcryptjs');


const usuario = require("../models/usuario");
const { generateJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
    const { email, password } = req.body;

    const errorInvalid = 'Invalid email / password';

    try {
        const user = await usuario.findOne({email})
        if ( !user ) return res.status(400).json({
            msg: errorInvalid
        })

        if ( !user.status ) return res.status(400).json({
            msg: errorInvalid
        })

        const validPassword = bcryptjs.compareSync(password, user.password)
        if ( !validPassword ) return res.status(400).json({
            msg: errorInvalid
        })


        const token = await generateJWT( user.id )


        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Error'
        })
    }

}

module.exports = {
    login
}