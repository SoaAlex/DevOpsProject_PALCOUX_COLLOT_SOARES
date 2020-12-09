const { expect } = require('chai')
let db

describe('MongoDB', () => {
  
  before(async() => {
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb://localhost:27017';
    const dbName = 'Database';
    var db
    
    client = await MongoClient.connect(url, { useUnifiedTopology: true },function(err, client) {
      db = client.db(dbName);
    });
  })
  
  it.skip('should connect to MongoDB', () => {
    expect(db?true:false).to.eql(true)
  })
})
