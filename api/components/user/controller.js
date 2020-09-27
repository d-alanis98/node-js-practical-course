const response = require('../../../network/response');
const { nanoid } = require('nanoid');
const TABLE = 'User';



module.exports = (injectedStore) => {
    let store = injectedStore;

    if(!injectedStore)
        store = require('../../../store/dummy');

    const getUsers = async (req, res) => {
        const users = await store.list(TABLE);
        return response.success(req, res, users, 200);
    }
    
    const getUser = async (req, res) => {
        const { params: { userId } } = req;
        if(!userId)
            return response.error(req, res, 'User Id is required', 402);
        const user = await store.get(TABLE, userId);
        if(!user)
            return response.error(req, res, 'User not found', 404);
        return response.success(req, res, user, 200);
    }

    const addUser = async (req, res) => {
        const { body: { id, name } } = req;
        if(!name)
            return response.error(req, res, 'User name is required', 400);
        const user = {
            name,
            id: id || nanoid()
        };

        const createdUser = await store.upsert(TABLE, user);
        console.log(createdUser)
        if(!createdUser)
            return response.error(req, res, 'Server error', 500); //Internal server error
        return response.success(req, res, createdUser, 201);
    }
    return {
        getUser,
        addUser,
        getUsers,
        
    };

};