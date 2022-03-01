const config = require('../../../config');

const store = require('../../../store/mysql');
const cache = require('../../../store/redis');

/* if (config.remoteDb === true) {
    const store = require('../../../store/remote-mysql');
    const cache = require('../../../store/remote-cache');
} else {
    const store = require('../../../store/mysql');
    const cache = require('../../../store/redis');
} */

const controller = require('./controller');

module.exports = controller(store, cache);