const mysql = require('mysql2');
const { nanoid } = require('nanoid');

const config = require('../config');

const dbConfig = {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.pass,
    database: config.mysql.database,
};

let connection;

const handleCon = () => {
    connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err){
            console.error('[db error] ',err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected');
        }
    });

    connection.on('error', err => {
        console.error('[db error] ',err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function insert(table, data) {
    return new Promise( (resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function update(table, data) {
    
    return new Promise( (resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id='${data.id}'`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function upsert(table, data, type) {
    if (type === 'update')
        return update(table, data);
    if (type === 'create')
        return insert(table, data);
}

function query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} 
                        WHERE ${table}.?`, query, (err, result) => {
            if(err) return reject(err);
            resolve(result[0] || null);
        })
    })
}

function remove(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id=${id}`, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        })
    })
}

module.exports = { list, get, upsert, query, remove };