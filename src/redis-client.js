const redis = require('redis');
console.log("redis server should be at "+process.env.REDIS_URL)
const client = redis.createClient({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD ? process.env.REDIS_PASSWORD : null
});

module.exports =  client
