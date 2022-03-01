const db = {
    'user': [
        {id: 1,
        name: 'Lusho'},
    ]
};

const list = async (table) => {
    return await db[table] || [];
}

const get = async (table, id) => {
    let colection = await list(table);
    return await colection.filter( item => item.id == id)[0] || null;
}

const upsert = async (table, data) => {
    if (!db[table]) {
        db[table] = [];
    }
    await db[table].push(data);
    return data;
}

const remove = async (table, id) => {
    await db[table].splice(id-1,1);
    return true;
}

const query = async (table, data) => {
    try {
        let colection = await list(table);
        let keys = Object.keys(data);
        let key = keys[0];
        return await colection.filter( item => item[key] == data[key])[0] || null;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { list, get, upsert, remove, query };