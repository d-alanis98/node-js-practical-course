const { nanoid } = require('nanoid');
const auth = require('../auth');
const response = require('../../../network/response');


const TABLE = 'User';
const FOLLOW_TABLE = 'user_follow';



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
        const { body: { name, userName, password } } = req;
        if(!name || !userName || !password)
            return response.error(req, res, 'All fields are required', 400);
        const user = {
            id: nanoid(),
            name,
            user_name: userName,
        };

        await auth.insert({
            id: user.id,
            userName: user.user_name,
            password
        });

        const createdUser = await store.insert(TABLE, user);
        if(!createdUser)
            return response.error(req, res); //Internal server error
        return response.success(req, res, createdUser, 201);
    }

    const updateUser = async (req, res) => {
        const { body: { id, name, userName } } = req;
        const user = {
            id,
            name,
            user_name: userName,
        };

        const updatedUser = await store.update(TABLE, user);
        if(!updatedUser)
            return response.error(req, res); //Internal server error
        return response.success(req, res, updatedUser, 200);
    }

    const followUser = async (req, res, next) => {
        const { 
            user: { id: userFrom },
            params: { id: userTo } 
        } = req;
        
        if(!userFrom || !userTo)
            return response.error(req, res, 'All fields are required', 400);
        try {
            let relationship = await store.insert(FOLLOW_TABLE, {
                user_from: userFrom,
                user_to: userTo
            });
            return response.success(req, res, relationship, 201);
        }
        catch(error) {
            next();
        }
        
    }

    return {
        getUser,
        addUser,
        getUsers,
        updateUser,
        followUser
        
    };

};