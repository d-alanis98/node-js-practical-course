const express = require('express');
const bodyParser = require('body-parser');
//Configuration
const { api } = require('../config.js');
//Routes
const routes = require('../network/routes');
//Error handler
const errors = require('../network/errors');
//We create an express instance
const app = express();
//We apply middlewares
app.use(bodyParser.json());
//We provide the express instance to the router
routes(app);
//We apply the error handler middleware (must be the last middleware applied)
app.use(errors);
//We listen in the specified port in configuration
app.listen(api.port, () => {
    console.log(`Api listening on port ${api.port}`);
});