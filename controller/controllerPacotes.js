const Pacotes = require('../model/modelPacotes');

exports.listar = (req, res, next) => {
    Pacotes.find({}, (error, pacotes) => {
        if(error){
            res.send(error);
        }
        res.status(200).send(pacotes);
    });
}
exports.inserir = (req, res, next) => {
    let newPacote = new Pacotes(req.body);
    newPacote.save((err, pacote) => {
        if(err){
            res.send(err);
        }
        res.status(200).send(pacote);
    })
}
exports.atualizar = (req, res, next) => {
    let id = req.params.id;
    let updatePacote = req.body;
    Pacotes.findOneAndUpdate({ _id: id}, updatePacote, {new: true}, (err, pacote) => {
        if(err){
            res.send(err);
        }
        res.status(200).send(pacote);
    });
}
exports.deletar = (req, res, next) => {
    let id = req.params.id;
    Pacotes.findByIdAndDelete({ _id: id}, (err, pacote) => {
        if(err){
            res.send(err);
        }
        res.status(200).send(pacote);
    });
}
exports.buscarPorId = (req, res, next) => {
    let id = req.params.id;
    Pacotes.findById(id, (err, pacote) => {
        if(err){
            res.send(err);
        }
        res.status(200).send(pacote);
    })
}
exports.procurar = (req, res, next) => {
    if(req.query && req.query.nome){
        let paramNome = req.query.nome;
        Pacotes.find({nome: paramNome}, (err, pacote) => {
            if(err){
                res.send(err);
            }
            res.status(200).send(pacote);
        });
    }
    if(req.query && req.query.categoriaId){
        let paramCategoria = req.query.categoriaId;
        Pacotes.find({categoria: paramCategoria}, (err, pacotes) => {
            if(err){
                res.send(err);
            }
            res.status(200).send(pacotes);
        });
    }
}