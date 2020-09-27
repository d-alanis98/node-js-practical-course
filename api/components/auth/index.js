//Store
const store = require('../../../store/mysql');
//Controller
const controller = require('./controller');

module.exports = controller(store);

