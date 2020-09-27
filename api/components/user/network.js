const express = require('express');
//Configuration
const { 
    constants: { UPDATE, FOLLOW }
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
router.post('/follow/:id', secure(FOLLOW), followUser);



module.exports = router;