
const  { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password required'] 
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
       // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject();
    user.uid =  _id;
    return user;
}

module.exports = model( 'Usuario', UsuarioSchema);
