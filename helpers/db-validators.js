const Role = require('../models/role');
const Usuario = require('../models/usuario');

const isValidRole = async(role = '') =>{
    const existRole = await Role.findOne({ role })
    if(!existRole) {
            throw new Error(`Role ${ role } not exist `)
    }
}

const existEmail = async (email = '') => {
    const existEmailDB = await Usuario.findOne({ email });
    if ( existEmailDB ) {
        throw new Error(`Email ${ email } already exist `)
    }
}

const existUserById = async (id = '') => {
    const existId = await Usuario.findById(id);
    if ( !existId ) {
        throw new Error(`Id: ${ id } don't exist `)
    }
}


module.exports = {
    isValidRole,
    existEmail,
    existUserById
}


