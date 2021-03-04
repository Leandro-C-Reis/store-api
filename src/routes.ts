import express from 'express';

import UsersController from './controllers/UsersController';
import AuthController from './controllers/AuthController';

import AuthMiddleware from './middlewares/AuthMiddleware';

const routes = express();
const users = express();
const auth = express();

auth.post('/login', AuthController.login);
auth.post('/refresh', AuthController.refresh);
auth.post('/me', AuthController.me);

// USERS ROUTES
users.post('/users', UsersController.create);
users.use('/users', AuthMiddleware.authenticate);
users.get('/users', UsersController.index);
users.get('/users/:id', UsersController.show);
users.post('/users/:id', UsersController.update);
users.delete('/users/delete/:id', UsersController.delete);

routes.use(users, auth);

export default routes;