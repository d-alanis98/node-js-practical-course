const mysql = require('mysql');
const { database } = require('../config');

const databaseConfiguration = { 
    host: database.host,
    user: database.user,
    password: database.password
}

let connection;


const handleConnection = () => {
    connection = mysql.createConnection(databaseConfiguration);

    connection.connect(error => {
        if(error) {
            console.error(`[DB_ERROR] ${error}`);
            setTimeout(handleConnection, 2000);
        }
        else console.log('DB connected');

    });

    connection.on('error', error => {
        console.error(`[DB_ERROR] ${error}`);
        if(error.code === 'PROTOCOL_CONNECTION_LOST')
            handleConnection();
        else throw error;
    });
}

handleConnection();

const executeQuery = (query, data = null) => new Promise((resolve, reject) => {
    connection.query(query, data, (error, data) => {
        console.log(data)
        if(error)
            return reject(error)
        else resolve(data);
    });
});

const list = table => (
    executeQuery(`SELECT * FROM node_social_network.${table.toLowerCase()}`)
);

const get = (table, id) => (
    executeQuery(`SELECT * FROM node_social_network.${table.toLowerCase()} WHERE ID = '${id}'`)
);

const insert = (table, data) => (
    executeQuery(`INSERT INTO node_social_network.${table.toLowerCase()} SET ?`, data)
);

const update = (table, data) => (
    executeQuery(`UPDATE node_social_network.${table} SET ? WHERE id = ?`, [data, data.id])
);

const query = (table, query) => (
    executeQuery(`SELECT * FROM node_social_network.${table} WHERE ?`, query)
)





module.exports = {
    get,
    list,
    query,
    insert,
    update
}