const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = (injectedStore, injectedCache) => {
    let store = injectedStore;
    let cache = injectedCache;
    if (!store) {
        store = require('../../../store/dummy');
    }
    if (!cache) {
        cache = require('../../../store/dummy');
    }

    const list = async () => {
        let users = await cache.list(TABLA);
        
        if (!users) {
            console.log('No cache, si db');
            users = await store.list(TABLA);
            cache.upsert(TABLA, users);
        } else {
            console.log('Datos de cache');
        }
        return users;
    }
    const get = (id) => {
        return store.get(TABLA, id);
    }
    const post = async (data, type) => {
        if(!data.name) {
            throw new Error ('No hay nombre');
        }
        const user = {
            name: data.name,
            username: data.username,
        }
        if(data.id) {
            user.id = data.id;
        } else {
            user.id = nanoid();
        }
        if (data.password || data.username) {
            await auth.post({
                id: user.id,
                username: user.username,
                password: data.password
            }, type)
        }
        return await store.upsert(TABLA, user, type);
    }
    const remove = (id) => {
        if(!id) {
            throw new Error ('No hay id');
        }
        return store.remove(TABLA, id);
    }

    const follow = (from, to, type) => {
        return store.upsert(TABLA+'_follow', {
            user_from: from,
            user_to: to,
        }, type);
    }

    const following = async (user) => {
        const join = {};
        join[TABLA] = 'user_to';
        const query = { user_from: user };

        return await store.query(TABLA + '_follow', query, join);
    }

    return {
        list,
        get,
        post,
        remove,
        follow,
        following,
    }
}