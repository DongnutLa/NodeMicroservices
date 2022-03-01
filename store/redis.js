const { createClient } = require('redis');

const config = require('../config');
/* 
const user = config.redis.user;
const host = config.redis.host;
const port = config.redis.port;
const password = config.redis.password;

(async () => {
    const client = createClient({
        url: `redis://${user}:${password}@${host}:${port}`
    });
  
    client.on('error', (err) => console.log('Redis Client Error', err));
  
    await client.connect();
  
    await client.set('key', 'value');
    const value = await client.get('key');
})(); */

const client = createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
});


const list = async (table) => {
    return new Promise( (resolve, reject) => {
        client.get(table, (err, data) => {
            if (err) return reject(err);

            let res = data || null;
            if (data) {
                res = JSON.parse(data);
            }
            resolve(res);
        });
    });
}

const get = (table, id) => {
    
}

const upsert = async (table, data) => {
    let key = table;
    if (data && data.id) {
        key = key + '_' + data.id;
    }

    client.setex(key, 10, JSON.stringify(data));
    return true;
}

module.exports = { list, get, upsert };