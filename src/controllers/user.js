const client = require('../redis-client')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
    }
    // Save to DB
    // TODO check if user already exists
    client.hmset(user.username, userObj, (err, res) => {
      if (err) return callback(err, null)
      callback(null, res) // Return callback
    })
  },
  get: (username, callback) => {
    //check params
    if(!username)
      return callback(new Error("Wrong user parameters"), null)
    
    //get
    client.hgetall(username, (err, reply) => {
      if (err) return callback(err, null)
      callback(null, reply) // Return callback
    })
  },
  getKeys: (callback) => {
    //get keys
    client.keys('*', (err, reply) => {
      if (err) return callback(err, null)
      callback(null, reply)
    })
  },
  delete: (username, callback) => {
    //check params
    if(!username)
      return callback(new Error("Wrong user parameters"), null)
    //delete
    client.del(username, (err, reply) => {
      if (err) return callback(err, null)
      callback(null, reply) // Return callback
    })
  },
  deleteAll: (callback) => {
    //deleteAll
    client.flushdb((err, reply) => {
      if (err) return callback(err, null)
      callback(null, reply) // Return callback
    })
  },
}
