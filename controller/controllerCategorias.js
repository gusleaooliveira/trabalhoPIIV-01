const Categorias = require('../model/modelCategorias');


exports.listar = (req, res, next) => {
    Categorias.find({}, (error, categorias) => {
        if(error){
            res.status(500).send(error);
        }
        res.status(200).send(categorias);
    });
}
exports.inserir = (req, res, next) => {
    let newCategoria = new Categorias(req.body);
    newCategoria.save((err, categoria) => {
        if(err){
            res.status(500).send(error);
        }
        res.status(201).send(categoria);
    })
}
exports.atualizar = (req, res, next) => {
    let id = req.params.id;
    let updateCategoria = req.body;
    Categorias.findOneAndUpdate({ _id: id}, updateCategoria, {new: true}, (err, categoria) => {
        if(err){
            res.status(500).send(error);
        }
        res.status(200).send(categoria);
    });
}
exports.deletar = (req, res, next) => {
    let id = req.params.id;
    Categorias.findByIdAndDelete({ _id: id}, (err, categoria) => {
        if(err){
            res.status(500).send(error);
        }
        res.status(200).send(categoria);
    });
}
exports.buscarPorId = (req, res, next) => {
    let id = req.params.id;
    Categorias.findById(id, (err, categoria) => {
        if(err){
            res.status(500).send(error);
        }
        res.status(200).send(categoria);
    })
}
exports.procurar = (req, res, next) => {
    if(req.query && req.query.categoria){
        let paramCategoria = req.query.categoria;
        Categorias.find({
            categoria: paramCategoria,
        }, (err, categoria) => {
            if(err){
                res.status(500).send(error);
            }
            res.status(200).send(categoria);
        });
    }
}