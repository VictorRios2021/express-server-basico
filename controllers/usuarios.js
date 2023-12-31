const { response } = require('express')


const usuariosGet = (req, res = response) => {
    const { nombre, id } = req.query;
    res.json({
        msg: 'Get API controlador',
        nombre,
        id
    })
}

const usuariosPost = (req, res = response) => {
    const { nombre, edad} = req.body;

    res.json({
        msg: 'Post API controlador',
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'Put API controlador',
        id
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API controlador'
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API controlador'
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}