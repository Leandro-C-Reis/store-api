import connection from './connection';

async function load()
{
    await connection();
}

export default load();