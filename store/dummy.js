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
    ],
    'Auth': []
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

const query = async (table, _query) => {
    let items = await list(table);
    let filteredItems = items;
    Object.entries(_query).forEach(([filter, value]) => {
        filteredItems = filteredItems.filter(item => item[filter] === value);
    });
    return filteredItems && filteredItems.length > 0 ? filteredItems[0] : null;
}

module.exports = {
    list,
    get,
    query,
    upsert,
    remove
};