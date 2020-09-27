const express = require('express');
//Controller
const { getUser, getUsers, addUser } = require('./index');
//Router
const router = express.Router();


//Routes
router.get('/', getUsers);
router.post('/', addUser);
router.get('/:userId', getUser);



module.exports = router;