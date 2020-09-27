const auth = require('../../../auth');
const {
    constants: { UPDATE, FOLLOW }
} = require('../../../config');

const checkPermissions = action => {
    const middleware = (req, res, next) => {
        switch(action) {
            case UPDATE:
                const { body: { id } } = req;
                auth.check.own(req, id);
                next();
                break;
            case FOLLOW:
                auth.check.logged(req);
                next();
            default:
                next();
        }
    }
    return middleware;
}

module.exports = checkPermissions;