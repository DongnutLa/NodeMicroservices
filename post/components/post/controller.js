const { nanoid } = require('nanoid');

const TABLA = 'post';

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    const list = (req, res, next) => {
        return store.list(TABLA);
    }
    const get = (id) => {
        return store.get(TABLA, id);
    }
    const post = async (data, type) => {
        const post = {
            text: data.text,
            user: data.user,
        }
        if(data.id) {
            post.id = data.id;
        } else {
            post.id = nanoid();
        }
        return await store.upsert(TABLA, post, type);
    }
    const getByUser = async (userId) => {
        return store.query(TABLA, { user: userId });
    }

    return { list, get, post, getByUser };
}