const client = require('../dbClient')

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
  getall: (callback) => {
    //get key
    let res = [];
    client.get('*', (err, reply) => {
      if (err) return callback(err, null)
      console.log(reply)
      if(reply){
            async.map(keys, function(key, cb) {
              console.log(key)
               client.get(key, function (value) {
                 console.log(value)
                    res.push({key,value})
                }); 
            });
        }
    })
    console.log(res)
    callback(null,res)
  },
}
