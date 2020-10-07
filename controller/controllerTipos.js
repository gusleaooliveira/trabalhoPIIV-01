const Tipos = require('../model/modelTipos');

exports.listar = (req, res, next) => {
    Tipos.find({}, (error, tipos) => {
        if(error){
            res.status(500).send(error);
        }
        res.status(200).send(tipos);
    });
}
exports.inserir = (req, res, next) => {
    let newTipo = new Tipos(req.body);
    newTipo.save((err, tipo) => {
        if(err){
            res.status(500).send(error);
        }
        res.status(201).send(tipo);
    })
}
exports.atualizar = (req, res, next) => {
    let id = req.params.id;
    let updateTipo = req.body;
    Tipos.findOneAndUpdate({ _id: id}, updateTipo, {new: true}, (err, tipo) => {
        if(err){
            res.status(500).send(error);
        }
        res.status(200).send(tipo);
    });
}
exports.deletar = (req, res, next) => {
    let id = req.params.id;
    Tipos.findByIdAndDelete({ _id: id}, (err, tipo) => {
        if(err){
            res.status(500).send(error);
        }
        res.status(200).send(tipo);
    });
}
exports.buscarPorId = (req, res, next) => {
    let id = req.params.id;
    Tipos.findById(id, (err, tipo) => {
        if(err){
            res.status(500).send(error);
        }
        res.status(200).send(tipo);
    })
}
exports.procurar = (req, res, next) => {
    if(req.query && req.query.tipo){
        let paramTipo = req.query.tipo;
        Tipos.find({
            tipo: paramTipo,
        }, (err, tipo) => {
            if(err){
                res.status(500).send(error);
            }
            res.status(200).send(tipo);
        });
    }
}