import { Connection, createConnection } from 'typeorm';
import * as variables from '../src/config/variables';
import path from 'path';

class DB {
    protected connection: Connection;

    async init()
    {
        const modelsDir = path.resolve(__dirname, '..', 'src', 'database', 'models');
        const migrationsDir = path.resolve(__dirname, '..', 'src', 'database', 'migrations');

        this.connection = await createConnection({
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

        if (!this.connection.isConnected)
        {
            process.exit(1);
        }
        
        console.log('Database connection created.');

        const migrations = await this.connection.runMigrations();
        
        if (migrations.length == 0)
        {
            process.exit(1);
        }

        console.log('Migrations completed');
    }

    async drop()
    {
        await this.connection.undoLastMigration();
        console.log('Migrations rolled back');
    }
}

export default new DB;