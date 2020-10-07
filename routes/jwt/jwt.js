const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

function verifiqueJwt(req, res, next){
    let token = null;
    if(req.cookies.token){ token = req.cookies.token; }
    if(req.signedCookies.token){ token = req.signedCookies.token; }
    else { 
        if(req.headers["x-access-token"]){
            token = req.headers["x-access-token"]; 
        }
        else {
            res.status(401).send({"msg": "Nenhum token fornecido!"});
        }
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err)return res.status(401).send({"msg": "Falha ao autenticar o token!"});

        req.userId = decoded.id;
        next();        
    });
}

module.exports = verifiqueJwt;