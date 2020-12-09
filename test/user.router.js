const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

let db

describe('User REST API', () => {

  before(() => {
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb://localhost:27017';
    const dbName = 'Database';
    var db
    
    client = MongoClient.connect(url, { useUnifiedTopology: true },function(err, client) {
      db = client.db(dbName);
    });
  })
  
  /**POST */
  describe('POST /users', () => {

    it('create a new user', (done) => {
      const user = {
        email: 'sergkudinov@edu.ece.fr',
        firstname: 'Sergei',
        lastname: 'Kudinov',
        password:'547588'
      }
      chai.request(app)
        .post('/users')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/users')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })

  /**GET */
  describe('GET /users', () => {
    const user = {
        email: 'sergkudinov@edu.ece.fr',
        firstname: 'Sergei',
        lastname: 'Kudinov',
        password:'547588'
      }
    let new_user
    before(async() => {
        new_user= await chai.request(app)
        .post('/users')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res).to.be.json
          return res.body.ops[0]
        })
        .catch((err) => {
           throw err
        })
    })

    it('get users', (done) => {
      chai.request(app)
        .get(`/users`)
        .send()
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res).to.be.json
          chai.expect(res.body).to.be.an('array');
          done()
        })
        .catch((err) => {
           throw err
        })
    })

    it('get a new user', (done) => {
      chai.request(app)
        .get(`/users/${new_user._id}`)
        .send()
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      chai.request(app)
        .get(`/users/0000`)
        .send()
        .then((res) => {
          chai.expect(res).to.have.status(404)
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })
  describe('DELETE /users', () => {

    it('delete users', (done) => {
      chai.request(app)
        .delete('/users')
        .send()
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it.skip('delete one user', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/users')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })
})
