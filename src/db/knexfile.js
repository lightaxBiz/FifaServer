module.exports = {
    client: process.env.DB_CLIENT,
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    },
    pool: {
        min: 1,
        max: 20,
        createTimeoutMillis: 3000,
        acquireTimeoutMillis: 3000,
        idleTimeoutMillis: 3000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100,
        propagateCreateError: false
    }
}