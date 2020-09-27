module.exports = {
    api: {
        port: process.env.API_PORT || 3000, 
        jwtSecret: process.env.API_SECRET || '1234'
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || ''
    },
    constants: {
        UPDATE: 'UPDATE',
        FOLLOW: 'FOLLOW',
    }
};