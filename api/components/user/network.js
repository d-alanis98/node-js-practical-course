const { Router } = require('express');
const express = require('express');
//Configuration
const { 
    constants: { UPDATE }
} = require('../../../config');
//Controller
const { getUser, getUsers, addUser, updateUser, followUser } = require('./index');
//Router
const router = express.Router();
//Authorization
const secure = require('./secure');


//Routes
router.get('/', getUsers);
router.post('/', addUser);
router.put('/', secure(UPDATE), updateUser);
router.get('/:userId', getUser);
//router.get('/follow')
router.post('/follow/:userTo', followUser);



module.exports = router;