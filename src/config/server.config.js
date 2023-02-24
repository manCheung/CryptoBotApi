import config from './config';
import { Client } from 'pg';

const database = "crypto"

const getConnection = () => {
    return new Client({
        user: config.sqlUserName,
        host: config.sqlHost,
        database: database,
        password: config.sqlPass,
        port: config.sqlPort
    })
}
// const client = new Client({
//     user: config.sqlUserName,
//     host: config.sqlHost,
//     database: database,
//     password: config.sqlPass,
//     port: config.sqlPort
// })

export default getConnection;