const { expect } = require('chai')
let client

describe('Redis', () => {
  
  before(() => {
    client = require('../src/redis-client')
  })
  
  it('should connect to Redis', () => {
    expect(client.connected).to.eql(true)
  })
})
