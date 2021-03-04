import express from 'express';
import cors from 'cors';
import routes from './routes';
import methodOverride from 'method-override';

const app = express();

app.use(cors());
app.use(methodOverride());
app.use(express.json());
app.use(routes);

export default app;