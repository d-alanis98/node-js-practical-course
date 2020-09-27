const db = {
    'User': [
        {
            id: '1',
            name: 'Damian'
        },
        {
            id: '2',
            name: 'Santi'
        },
        {
            id: '3',
            name: 'Nancy'
        }
    ]
};

const list = async (table) => (
    db[table]
);

const get = async (table, itemId) => {
    let items = await list(table);
    return items.find(item => item.id === itemId)
};

const upsert = async (table, data) => {
    db[table].push(data);
    return db[table][db[table].length - 1]
};

const remove = async (table, itemId) => {
    let items = await list(table)
    return items.filter(items => items.id !== itemId)
};

module.exports = {
    list,
    get,
    upsert,
    remove
};