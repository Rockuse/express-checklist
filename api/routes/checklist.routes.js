const handler = require('../controller/checklist.handler');
const { authenticateToken } = require('../utility/token');

module.exports = (router) => {
  router.get('/', authenticateToken, handler.getChecklist);
  router.post('/', authenticateToken, handler.addChecklist);
  router.delete('/:id', authenticateToken, handler.deleteChecklist);

  router.get('/:id/item', authenticateToken, handler.getChecklistItemAll);
  router.post('/:id/item', authenticateToken, handler.addChecklistItem);
  router.get('/:id/item/:item', authenticateToken, handler.getChecklistItemById);
  router.put('/:id/item/:item', authenticateToken, handler.setStatusChecklistItemById);
  router.delete('/:id/item/:item', authenticateToken, handler.deleteChecklistItemById);
  router.put('/:id/item/rename/:item', authenticateToken, handler.renameChecklistItemById);

  return router;
};
