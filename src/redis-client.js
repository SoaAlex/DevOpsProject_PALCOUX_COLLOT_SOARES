const redis = require('redis');
console.log("redis server should be at "+process.env.REDIS_URL)
const client = redis.createClient(process.env.REDIS_URL);

module.exports =  client
