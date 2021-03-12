import express from 'express';

import auth from './routes/auth';
import users from './routes/users';
import products from './routes/products';
import orders from './routes/orders';
import addresses from './routes/addresses';

const routes = express();

routes.use('/', auth);
routes.use('/users', users);
routes.use('/products', products);
routes.use('/addresses', addresses);
routes.use('/orders', orders);

export default routes;