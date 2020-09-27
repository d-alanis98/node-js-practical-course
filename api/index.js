const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
//Configuration
const { api } = require('../config.js');
const user = require('./components/user/network');

const app = express();

app.use(bodyParser.json());

const swaggerDocumentation = require('./swagger.json');

//Router
app.use('/api/user', user);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

app.listen(api.port, () => {
    console.log(`Api listening on port ${api.port}`);
});