module.exports = {
    client: 'mysql',
    connection: {
        host : 'fifaserverdb.c1bre5khm2pq.us-east-1.rds.amazonaws.com',
        // port : '3306',
        user : 'lightax',
        password : 'aaaRAA89',
        database : 'FifaServerDB'
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