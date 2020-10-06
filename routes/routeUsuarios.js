const { Router } = require('express');
const router = Router();
const controller = require('../controller/controllerUsuarios');
const controllerLogin = require('../controller/controllerLogin');
const  verifiqueJwt  = require('./jwt/jwt');


router.post('/login', controllerLogin.login);
router.get('/logout', controllerLogin.logout);
router.get('/', verifiqueJwt, controller.listar);
router.get('/search', verifiqueJwt, controller.procurar);
router.get('/:id', verifiqueJwt, controller.buscarPorId);
router.put('/:id', verifiqueJwt, controller.atualizar);
router.delete('/:id', verifiqueJwt, controller.deletar);
router.post('/', verifiqueJwt, controller.inserir);

module.exports = router;