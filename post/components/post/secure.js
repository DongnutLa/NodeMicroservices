const auth = require('../../../auth');

module.exports = function checkAuth(action) {

    const middleware = (req, res, next) => {
        switch (action) {
            case 'update':
                const owner = req.body.user;
                auth.check.own(req, owner);
                next();
                break;
        
            default:
                next();
        }
    }
    return middleware;
}