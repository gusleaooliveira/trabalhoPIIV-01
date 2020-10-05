let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const CategoriasSchema = new Schema({
    categoria: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Categorias', CategoriasSchema);