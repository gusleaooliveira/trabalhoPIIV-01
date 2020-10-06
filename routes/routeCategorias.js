const { Router } = require('express');
const router = Router();
const controller = require('../controller/controllerCategorias');
const controllerLogin = require('../controller/controllerLogin');
const  verifiqueJwt  = require('./jwt/jwt');

router.post('/login', controllerLogin.login);
router.get('/logout', controllerLogin.logout);
router.get('/', controller.listar);
router.get('/search', controller.procurar);
router.get('/:id', controller.buscarPorId);
router.put('/:id',verifiqueJwt, controller.atualizar);
router.delete('/:id',verifiqueJwt, controller.deletar);
router.post('/',verifiqueJwt, controller.inserir);

module.exports = router;