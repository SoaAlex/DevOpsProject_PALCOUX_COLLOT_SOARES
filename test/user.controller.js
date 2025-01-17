const { expect } = require("chai");
const userController = require("../src/controllers/user");

describe("User controller REDIS DB", () => {
  describe("Create", () => {
    it("create a new user", (done) => {
      const user = {
        email: "sergkudinov@edu.ece.fr",
        password: "547588",
        username: "sergkudinov",
        firstname: "Sergei",
        lastname: "Kudinov",
      };
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result).to.be.equal("OK");
        done();
      });
    });

    it("passing wrong user parameters", (done) => {
      const user = {
        firstname: "Sergei",
        lastname: "Kudinov",
      };
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });
  });

  describe("Get", () => {
    //   // TODO Create test for the get method
    it("get user by email", (done) => {
      const username = "sergkudinov";

      userController.get(username, (err, reply) => {
        expect(err).to.be.equal(null);
        expect(reply).to.not.be.equal(null);
        expect(reply).to.be.a('object');
        expect(reply).to.have.property('email');
        expect(reply).to.have.property('password');
        done();
      });        
    });

    it("passing wrong user by email", (done) => {
      const username = "Hellothere";

      userController.get(username, (err, reply) => {
        expect(err).to.be.equal(null);
        expect(reply).to.be.equal(null);
        done();
      });        
    });

    it("get all keys", (done) => {
      const username = "sergkudinov";

      userController.getKeys((err, reply) => {
        expect(err).to.be.equal(null);
        expect(reply).to.not.be.equal(null);
        expect(reply).to.be.a('array');
        expect(reply[0]).to.be.equal('sergkudinov');
        done();
      });        
    });
  });

  describe("Delete", () => {
    it("delete user by email", (done) => {
      const username = "sergkudinov";

      userController.delete(username, (err, reply) => {
        expect(err).to.be.equal(null);
        expect(reply).to.not.be.equal(null);
        done();
      });        
    });

    it("delete all", (done) => {
      userController.deleteAll((err, reply) => {
        expect(err).to.be.equal(null);
        expect(reply).to.not.be.equal(null);
        expect(reply).to.be.equal('OK');
        done();
      });        
    });
  });
});
