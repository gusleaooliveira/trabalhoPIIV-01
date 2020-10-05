const { Router } = require('express');
const router = Router();
const controller = require('../controller/controllerCategorias');

router.get('/', controller.listar);
router.get('/search', controller.procurar);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);
router.post('/', controller.inserir);

module.exports = router;