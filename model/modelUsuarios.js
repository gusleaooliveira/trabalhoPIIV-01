let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const  UsuariosSchema =  new Schema({
    nome: String,
    sobrenome: String,
    email: String,
    senha: String,
    tipo: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Tipos'}
    ]
}, {
    versionKey: false
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);