import express from 'express';
import AddressesController from '../controllers/AddressesController';
import AuthMiddleware from '../middleware/AuthMiddleware';

const router = express();

router.use('/', AuthMiddleware.authenticate);
router.get('/', AddressesController.index);
router.get('/:id', AddressesController.show);
router.post('/', AddressesController.create);
router.post('/:id', AddressesController.update);
router.delete('/delete/:id', AddressesController.delete);

export default router;