const Usuarios = require('../model/modelUsuarios');

exports.listar = (req, res, next) => {
    Usuarios.find({}, (error, usuarios) => {
        if(error){
            res.send(error);
        }
        res.status(200).send(usuarios);
    });
}
exports.inserir = (req, res, next) => {
    let newUsuario = new Usuarios(req.body);
    newUsuario.save((err, usuario) => {
        if(err){
            res.send(err);
        }
        res.status(200).send(usuario);
    })
}
exports.atualizar = (req, res, next) => {
    let id = req.params.id;
    let updateUsuario = req.body;
    Usuarios.findOneAndUpdate({ _id: id}, updateUsuario, {new: true}, (err, usuario) => {
        if(err){
            res.send(err);
        }
        res.status(200).send(usuario);
    });
}
exports.deletar = (req, res, next) => {
    let id = req.params.id;
    Usuarios.findByIdAndDelete({ _id: id}, (err, usuario) => {
        if(err){
            res.send(err);
        }
        res.status(200).send(usuario);
    });
}
exports.buscarPorId = (req, res, next) => {
    let id = req.params.id;
    Usuarios.findById(id, (err, usuario) => {
        if(err){
            res.send(err);
        }
        res.status(200).send(usuario);
    })
}
exports.procurar = (req, res, next) => {
    if(req.query && req.query.email && req.query.senha){
        let paramEmail = req.query.email;
        let paramSenha = req.query.senha;
        Usuarios.find({
            email: paramEmail,
            senha: paramSenha
        }, (err, usuario) => {
            if(err){
                res.send(err);
            }
            res.status(200).send(usuario);
        });
    }
}