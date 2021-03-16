import express from 'express';
import OrdersController from '../controllers/OrdersController';
import AuthMiddleware from '../middleware/AuthMiddleware';

const router = express();

router.use('/', AuthMiddleware.authenticate);
router.get('/', OrdersController.index);
router.get('/:id', OrdersController.show);
router.get('/list/actives', OrdersController.actives);
router.get('/list/user/:id', OrdersController.user);
router.post('/', OrdersController.create);
router.post('/:id', OrdersController.update);
router.post('/cancel/:id', OrdersController.cancel);
router.delete('/delete/:id', OrdersController.delete);

export default router;