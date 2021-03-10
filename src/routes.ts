import express from 'express';

import UsersController from './controllers/UsersController';
import AuthController from './controllers/AuthController';
import ProductsController from './controllers/ProductsController';

import AuthMiddleware from './middlewares/AuthMiddleware';

const routes = express();
const users = express();
const auth = express();
const products = express();

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

// PRODUCTS ROUTES
products.use('/products', AuthMiddleware.authenticate);
products.get('/products'), ProductsController.index;
products.get('/products/:id', ProductsController.show);
products.post('/products'), ProductsController.create;
products.post('/products/:id', ProductsController.update);
products.delete('/products/delete/:id', ProductsController.delete);

routes.use(users, auth, products);

export default routes;