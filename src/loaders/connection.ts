import { createConnection } from 'typeorm';
import * as variables from '../config/variables';

const connection = async () => {
    const connect = await createConnection({
        type: 'mysql',
        host: variables.db_host,
        port: variables.db_port,
        database: variables.db_name,
        username: variables.db_user,
        password: variables.db_password,
        entities: ["./src/database/models/*.{ts,js}"],
        migrations: ["./src/database/migrations/*.{ts,js}"],
        cli: {
            entitiesDir: "./src/database/models",
            migrationsDir: "./src/database/migrations"
        }
    });

    if (!connect.isConnected)
    {
        process.exit(1);
    }
    
    console.log('ORM connection created');
}   

export default connection;