import express from 'express';
import OrdersController from '../controllers/OrdersController';
import AuthMiddleware from '../middleware/AuthMiddleware';

const router = express();

router.use('/', AuthMiddleware.authenticate);
router.get('/', OrdersController.index);
router.get('/:id', OrdersController.show);
router.post('/', OrdersController.create);
router.post('/:id', OrdersController.update);
router.delete('/delete/:id', OrdersController.delete);

export default router;