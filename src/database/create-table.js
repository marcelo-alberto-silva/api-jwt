import sql from 'mssql';
import 'dotenv/config.js';

async function createTable() {
    try {
        await sql.connect(process.env.CONNECTION_STRING);
        console.log(await sql.query("select * from sys.tables"));
        console.log('conectou...')
    } catch (err) {
        console.log('erro na conexão...' + err);
    }
}

await createTable();

