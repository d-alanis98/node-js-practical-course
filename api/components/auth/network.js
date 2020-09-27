const express = require('express');
//Controller
const { login } = require('./index');
//Router
const router = express.Router();

//Routes
router.post('/login', login);



module.exports = router;