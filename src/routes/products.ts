import express from 'express';
import ProductsController from '../controllers/ProductsController';
import AuthMiddleware from '../middleware/AuthMiddleware';

const router = express();

router.use('/', AuthMiddleware.authenticate);
router.get('/', ProductsController.index);
router.get('/:id', ProductsController.show);
router.post('/', ProductsController.create);
router.post('/:id', ProductsController.update);
router.delete('/delete/:id', ProductsController.delete);

export default router;