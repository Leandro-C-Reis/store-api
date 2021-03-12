import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express();

router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/me', AuthController.me);

export default router;