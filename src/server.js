/**INIT */
//swagger
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi =require('swagger-ui-express')
//express
const express = require('express');
const app = express();
//routes
const userRouter = require('./routes/user')
//bodyParser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
//path
const path = require('path')

const client = require('./redis-client');

const swaggerOptions = {
  swaggerDefinition:  {
    info: {
      version: "2.0.0",
      title: "DevOps Project API",
      description: "DevOps Project API information",
      contact: {
        name: "COLLOT Paul SOARES Alexandre PALCOUX Hector" 
      },
      servers:["http://localhost:8080"]
    }
  },
  apis: ["src/routes/user.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))



//define route
app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/pages/index.html')))
//app.get('/', (req, res) => res.send('Hello World! DevOps project of Paul, Alexandre and Hector. ECE Paris'))
app.use('/users', userRouter)

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
module.exports = server