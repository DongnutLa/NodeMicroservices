module.exports = {
    remoteDb: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000
    },
    post: {
        port: process.env.POST_PORT || 3002
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || '3306',
        user: process.env.MYSQL_USER || 'dongnutla',
        pass: process.env.MYSQL_PASS || 'Lusho-1597',
        database: process.env.MYSQL_DB || 'microservicios',
    },
    mysql_service: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    },
    cache_service: {
        host: process.env.CACHE_SRV_HOST || 'localhost',
        port: process.env.CACHE_SRV_PORT || 3003,
    },
    redis: {
        user: process.env.REDIS_USER || 'dongnut',
        host: process.env.REDIS_HOST || 'redis-13761.c278.us-east-1-4.ec2.cloud.redislabs.com',
        port: process.env.REDIS_PORT || '13761',
        password: process.env.REDIS_PASSWORD || 'tFo9NGyNFGjxnuyH4EOe7LXQMWVDy7XM',//'Lusho-1597'
    },
}