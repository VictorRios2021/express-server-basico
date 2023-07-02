const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req, res = response) => {
    const { limit = 5, skip = 0 } = req.query;

    const query = { status: true };
    const usuariosPromise = Usuario.find(query)
        .skip(Number(skip))
        .limit(Number(limit));

    const totalPromise =  Usuario.countDocuments(query);

    const [ usuarios, total ] = await Promise.all([
        usuariosPromise,
        totalPromise
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    const { name, email, password, role } = req.body;
    const usuario = new Usuario( { name, email, password, role });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body

    if( password ) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest);

    res.json({
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API controlador'
    })
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    const user = await Usuario.findByIdAndUpdate(id, {status: false})
    res.json(user)
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}