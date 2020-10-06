const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Usuarios = require('../model/modelUsuarios');

exports.login = (req, res, next) => {
    if(!req.cookie || !req.signedCookie){
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
                let token = jwt.sign({usuario}, process.env.SECRET, {expiresIn: 300});
                res.cookie('token', token, { signed: true }).send({"token": token});
            });
        }
    }
}

exports.logout = (req, res, next) => {
    if(req.cookies || req.signedCookies){
        res.clearCookie('token').send({"msg": "ok"})
    }
}