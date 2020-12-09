const express = require('express')
const ObjectID = require('mongodb').ObjectID;
const userRouter = express.Router()
/**
 * Import MongoClient & connexion à la DB
 */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'Database';
var db
 
MongoClient.connect(url, { useUnifiedTopology: true },function(err, client) {
  db = client.db(dbName);
});

/**
 * Router 
*/
userRouter
  /**GET users */
  .get('/', async (req,res) => {
    try {
        const docs = await db.collection('users').find({}).toArray()
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        throw err
    }
  })
  
  /**POST users */
  .post('/', async (req,res) => {
    try {
        if(!req.body.email && !req.body.password)
        {
          res.status(400).send()
        }
        else
        {
          const docs = await db.collection('users').insertOne(req.body)
          res.status(201).json(docs)
        }
    } catch (err) {
        //console.log(err)
        res.status(400).send()
        throw err
    }
  })
  
  /**GET users by id */
  .get('/:id', async (req,res) => {
    try {
        const docs = await db.collection('users').find({_id:ObjectID(req.params.id)}).toArray()
        res.status(200).json(docs)
    } catch (err) {
      res.status(404).send()
    }
  })
  
  /**DELETE users by id */
  .delete('/:id', async (req,res) => {
    try {
        const docs = await db.collection('users').deleteOne({_id:req.id})
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        throw err
    }
  })
  
  /**DELETE users */
  .delete('/', async (req,res) => {
    try {
        const docs = await db.collection('users').deleteMany({})
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        throw err
    }
  })
  
module.exports = userRouter;
