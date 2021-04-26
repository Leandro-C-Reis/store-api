import mongoose from 'mongoose';
import connection from '../database/connection';
import { mongo_uri } from '../config/variables';

async function load() {
    await connection();
    await mongoose.connect(`${mongo_uri}`, { useNewUrlParser: true, useUnifiedTopology: true });
}

export default load();