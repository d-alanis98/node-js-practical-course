//Dependencies
const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const response = require('../../../network/response');

const TABLE = 'Auth';

module.exports = (injectedStore) => {
    let store = injectedStore;
    if(!injectedStore)
        store = require('../../../store/dummy');

    const login = async (req, res) => {
        const { body: { userName, password } } = req;
        const [ userData ] = await store.query(TABLE, {
            user_name: userName
        });
        if(!userData)
            return response.error(req, res, 'User not found', 404);
        
        return bcrypt.compare(password, userData.password)
            .then(areEqual => {
                if(!areEqual)
                    return response.error(req, res, 'Invalid', 404);
                //We extract all the data, except from the password, which will not be included in the JWT body
                const { password: userPassword, ...userDataWithoutPassword } = userData;
                let token = auth.sign(userDataWithoutPassword);
                return response.success(req, res, token, 200);
            });
    }

    const insert = async ({ id, userName, password }) => {
        const authData = {
            id,
            user_name: userName,
            password: await bcrypt.hash(password, 5)
        }

        return store.insert(TABLE, authData);
    }

    const update = async ({ id, userName, password }) => {
        const authData = {
            id
        };

        if(userName)
            authData.user_name = userName;

        if(password)
            authData.password = await bcrypt.hash(password, 5);
        return store.update(TABLE, authData);
    }

    return {
        login,
        insert,
        update
    }
}