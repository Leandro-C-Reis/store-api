import { createConnection } from 'typeorm';
import * as variables from '../config/variables';
import path from 'path';

const connection = async () => {
    const modelsDir = path.resolve(__dirname, '..', 'models');
    const migrationsDir = path.resolve(__dirname, '..', 'migrations');

    const connect = await createConnection({
        type: 'mysql',
        host: variables.db_host,
        port: variables.db_port,
        database: variables.db_name,
        username: variables.db_user,
        password: variables.db_password,
        entities: [modelsDir + "/*.{ts,js}"],
        migrations: [migrationsDir + "/*.{ts,js}"],
        cli: {
            entitiesDir: modelsDir,
            migrationsDir: migrationsDir
        }
    });

    if (!connect.isConnected) {
        process.exit(1);
    }

    console.log('ORM connection established');

    return connect;
}

export default connection;