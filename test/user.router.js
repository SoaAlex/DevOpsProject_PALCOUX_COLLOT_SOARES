const app = require('../src/server')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

let client

describe('User REST API', () => {

  before(() => {
    client = require('../src/redis-client')
  })
  
  after(()=> {
    app.close()
    client.quit()
  })

  /*POST*/
  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        email: 'sergkudinov@edu.ece.fr',
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov',
        password: '0000',
      }
      chai.request(app)
        .post('/users')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    /*WRONG POST*/
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
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
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
        username: 'sergkudinov',
        email: 'sergkudinov@edu.ece.fr',
        firstname: 'Sergei',
        lastname: 'Kudinov',
        password:'547588'
      }
    let new_user
    before(async() => {
        await chai.request(app)
        .post('/users')
        .send(user)
        .then((res) => {
          chai.expect(res).to.be.json;
        })
        .catch((err) => {
           throw err
        })
    })

    it('get keys', (done) => {
      chai.request(app)
        .get(`/users/keys`)
        .send()
        .then((res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res).to.be.json;
          chai.expect(res.body).to.be.an('array');
          done()
        })
        .catch((err) => {
           throw err
        })
    })

    it('get a new user', (done) => {
      chai.request(app)
        .get(`/users/${user.username}`)
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
        .get(`/users/${user.email}`)
        .send()
        .then((res) => {
          chai.expect(res).to.have.status(404)
          chai.expect(res.body.status).to.equal('no data')
          chai.expect(res).to.be.json
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
          chai.expect(res.body.status).to.be.equal('OK')
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('delete one user', (done) => {
      const user = {
          username: 'sergkudinov',
      }
      chai.request(app)
        .delete(`/users/${user.username}`)
        .send()
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.be.equal('OK')
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })
})
