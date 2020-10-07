const Usuarios = require('../model/modelUsuarios');
const bcrypt = require('bcrypt');
const salto = bcrypt.genSaltSync(13);
 

exports.listar = (req, res, next) => {
    Usuarios.find({}, (error, usuarios) => {
        if(error){
            res.status(400).send(error);
        }
        res.status(200).send(usuarios);
    });
}
exports.inserir = (req, res, next) => {
    let usuario = req.body;
    let senha = req.body.senha;
    if(req.body.senha){
        bcrypt.genSalt(salto, function(err, salt) {
            bcrypt.hash(senha, salt, function(err, hash) {
                usuario['senha'] = hash;
            });
        });
    }
    let newUsuario = new Usuarios(usuario);
    newUsuario.save((err, usuario) => {
        if(err){
            res.status(400).send(error);
        }
        res.status(201).send(usuario);
    })
}
exports.atualizar = (req, res, next) => {
    let id = req.params.id;
    let updateUsuario = req.body;
    let senha = req.body.senha;
    if(req.body.senha){
        bcrypt.genSalt(salto, function(err, salt) {
            bcrypt.hash(senha, salt, function(err, hash) {
                updateUsuario['senha'] = hash;
            });
        });
    }
    Usuarios.findOneAndUpdate({ _id: id}, updateUsuario, {new: true}, (err, usuario) => {
        if(err){
            res.status(400).send(error);
        }
        res.status(200).send(usuario);
    });
}
exports.deletar = (req, res, next) => {
    let id = req.params.id;
    Usuarios.findByIdAndDelete({ _id: id}, (err, usuario) => {
        if(err){
            res.status(400).send(error);
        }
        res.status(200).send(usuario);
    });
}
exports.buscarPorId = (req, res, next) => {
    let id = req.params.id;
    Usuarios.findById(id, (err, usuario) => {
        if(err){
            res.status(400).send(error);
        }
        res.status(200).send(usuario);
    })
}
exports.procurar = (req, res, next) => {
    if(req.query && req.query.tipo){
        Usuarios.find({
            tipo: req.query.tipo
        }, (err, usuario) => {
            if(err)res.status(400).send(err);
            res.status(200).send(usuario);            
        });
    }
    if(req.query && req.query.email && req.query.senha){
        let paramEmail = req.query.email;
        let paramSenha  = req.query.senha;

        Usuarios.find({
            email: paramEmail
        }, (err, usuario) => {
            if(err)res.status(400).send(err);
            let senha = usuario[0]['senha'];
            bcrypt.compare(paramSenha, senha, (err, verifica) =>{
                console.log(verifica, senha, paramSenha);
                if(!verifica){res.status(400).send(verifica);}
                else {
                    Usuarios.find({
                        email: paramEmail,
                        senha: senha
                    }, (err, usuario) => {
                        if(err){res.status(400).send(verifica);}
                        res.status(200).send(usuario);
                    });
                }
            });            
        });
     
    }

    
}