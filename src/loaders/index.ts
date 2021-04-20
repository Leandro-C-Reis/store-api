import connection from '../database/connection';

async function load() {
    await connection();
}

export default load();