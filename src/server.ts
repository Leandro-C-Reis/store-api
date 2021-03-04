
import app from './app';
import * as variables from './config/variables';

async function startServer() {
    
    if (!variables.port)
    {
        process.exit(1);
    }

    await require('./loaders');

    app.listen(variables.port, () => console.log(`Listening on port: ${variables.port}`));
}

startServer();