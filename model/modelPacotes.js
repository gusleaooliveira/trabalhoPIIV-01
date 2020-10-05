let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const PacotesSchema =  new Schema({
    nome: String,
    versao: String,
    descricao: String,
    comandoInstalacao: String,
    comandoAtualizar: String,
    comandoApagar: String,
    categoria: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Categorias'}
    ]
}, {
    versionKey: false
});

module.exports = mongoose.model('Pacotes', PacotesSchema);