const swaggerUi = require('swagger-ui-express');
//Routes
const user = require('../api/components/user/network');
const auth = require('../api/components/auth/network');
//Documentation file
const swaggerDocumentation = require('../api/swagger.json');

module.exports = (server) => {
    server.use('/api/user', user);
    server.use('/api/auth', auth);
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));
}