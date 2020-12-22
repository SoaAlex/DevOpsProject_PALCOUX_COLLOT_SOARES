const express = require("express");
const userController = require("../controllers/user");

const userRouter = express.Router();

userRouter
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
