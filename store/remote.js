const request = require('request');

const createRemoteDb = (host, port) => {
    const URL = 'http://'+host+':'+port;

    const list = (table) => {
        return req('GET', table);
    }

    /* const get = (table, id);
    const upsert = (table, data)
    const query = (table, query, join) */

    const req = (method, table, data) => {
        let url = URL + '/' + table;
        body = '';

        return new Promise(
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body,
            }, (err, req, body) => {
                if (err) {
                    console.error('Error con la BD remota', err);
                    return reject(err.message);
                }
                const resp = JSON.parse(body);
                return resolve(resp.body);
            })
        )
    }
}

module.exports = createRemoteDb;