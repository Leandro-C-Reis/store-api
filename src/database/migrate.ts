import { consoleColors } from './../config/variables';
import connection from './connection';
import chalk from 'chalk';

async function migrate()
{
    const connect = await connection();

    const migrations = await connect.runMigrations();

    for (const migration of migrations)
    {
        console.log(consoleColors.FgGreen, `Migrated: ${migration.name}.`, consoleColors.FgWhite);
    }

    if (migrations.length == 0)
    {
        // console.log(consoleColors.FgYellow,'Nothing to migrate.', consoleColors.FgWhite);
        console.log(chalk.yellow(' Nothing to migrate'));
    }

    process.exit(0);
}

migrate();
