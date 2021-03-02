import { createConnection } from 'typeorm';
import app from './app';

createConnection();

app.listen(8000, () => console.log(`Listening on port: ${8000}`));