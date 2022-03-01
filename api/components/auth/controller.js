const auth = require('../../../auth');
const bcrypt = require('bcrypt');
const error = require('../../../utils/error');

const TABLA = 'auth';

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    
    const login = async (username, password) => {
        const data = await store.query(TABLA, { username });

        const res = await bcrypt.compare(password, data.password);
        if(!res) {
            throw error('Información inválida', 401);
        }
        //generar token
        return auth.sign(data);        
    }

    const post = async (data, type) => {
        const authData = {
            id: data.id,
            username: data.username || null,
            password: await bcrypt.hash(data.password, 10) || null
        }
        return store.upsert(TABLA, authData, type);
    }

    return {
        post,
        login,
    }
}