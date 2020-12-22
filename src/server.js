/**INIT */
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

const client = require('./redis-client');

//define route
app.get('/', (req, res) => res.send('Hello World! DevOps project of Paul, Alexandre and Hector. ECE Paris'))
app.use('/users', userRouter)

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
module.exports = server