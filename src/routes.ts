import express from 'express';

import UsersController from './controllers/UsersController';

const routes = express();

routes.get('/users', (new UsersController).index);
routes.get('/users/:id', (new UsersController).show);
routes.post('/users', (new UsersController).create);
routes.post('/users/:id', (new UsersController).update);
routes.delete('/users/delete/:id', (new UsersController).delete);

export default routes;