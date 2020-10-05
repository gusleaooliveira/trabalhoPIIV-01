let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const TipoSchema = new Schema({
    tipo: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Tipos', TipoSchema);