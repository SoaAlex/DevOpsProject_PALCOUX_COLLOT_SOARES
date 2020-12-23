const express = require("express");
const userController = require("../controllers/user");

const userRouter = express.Router()




userRouter
/**
 * @swagger
 * /users:
 *  post:
 *    description: Create a new user
 *    parameters:
 *    - name: username
 *      in: body
 *      description: username of the new user
 *      type: String
 *    - name: email
 *      in: body
 *      description: email of the new user
 *      type: String
 *    - name: firstname
 *      in: body
 *      description: firstname of the new user
 *      type: String
 *    - name: lastname
 *      in: body
 *      description: lastname of the new user
 *      type: String
 *    - name: password
 *      in: body
 *      description: password of the new user
 *      type: String
 *    responses:
 *      '201':
 *        description: Successful responce
 *      '400':
 *        description: An error has occurred
 */
  .post("/", (req, resp) => {
    userController.create(req.body, (err, res) => {
      let respObj;
      if (err) {
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(400).json(respObj);
      }
      respObj = {
        status: "success",
        msg: res,
      };
      resp.status(201).json(respObj);
    });
  })

/**
 * @swagger
 * /users/keys:
 *   get:
 *    description: Get all keys 
 *    responses:
 *      '200':
 *        description: Successful responce
 *      '404':
 *        description: An error has occurred  
 */
  .get("/keys", (req, resp) => {
    userController.getKeys((err, res) => {
      let respObj;
      if (err) {
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(404).json(respObj);
      }
      resp.status(200).json(res);
    });
  })

  /**
 * @swagger
 * /users/{username}:
 *  get:
 *    description: Get an user by his id (username)
 *    parameters:
 *    - in: path
 *      name: username
 *      required: true
 *      schema:
 *        type: String
 *      description: the user ID (username)
 *    responses:
 *      '200':
 *        description: Successful responce
 *      '404':
 *        description: An error has occurred
*/
  .get("/:username", (req, resp) => {
    userController.get(req.params.username, (err, res) => {
      let respObj;
      if (err) {
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(404).json(respObj);
      }
      if (!res) {
        respObj = {
          status: "no data",
        };
        return resp.status(404).json(respObj);
      }
      resp.status(200).json(res);
    });
  })
/**
 * @swagger
 * /users/{username}:
 *  delete:
 *    description: Delete an user by his id (username)
 *    parameters:
 *    - in: path
 *      name: username
 *      required: true
 *      schema:
 *        type: String
 *      description: the user ID (username)
 *    responses:
 *      '200':
 *        description: Successful responce
 *      '404':
 *        description: An error has occurred
*/
  .delete("/:username", (req, resp) => {
    userController.delete(req.params.username, (err, res) => {
      let respObj;
      if (err) {
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(404).json(respObj);
      }

      respObj = {
        status: "OK",
      };

      return resp.status(200).json(respObj);
    });
  })
/**
 * @swagger
 * /users:
 *  delete:
 *    description: Delete all user on the database
 *    responses:
 *      '200':
 *        description: Successful responce
 *      '404':
 *        description: An error has occurred
 */
  .delete("/", (req, resp) => {
    userController.deleteAll((err, res) => {
      let respObj;
      if (err) {
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(404).json(respObj);
      }
      respObj = {
        status: "OK",
      };
      return resp.status(200).json(respObj);
    });
  });
module.exports = userRouter;
