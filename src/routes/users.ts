import express from 'express';
import UsersController from '../controllers/UsersController';
import AuthMiddleware from '../middleware/AuthMiddleware';

const router = express();

router.post('/', UsersController.create);
router.use('/', AuthMiddleware.authenticate);
router.get('/', UsersController.index);
router.get('/:id', UsersController.show);
router.post('/:id', UsersController.update);
router.delete('/delete/:id', UsersController.delete);

export default router;