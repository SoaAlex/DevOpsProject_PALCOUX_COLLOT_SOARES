const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World! DevOps project of Paul, Alexandre and Hector'))

app.use('/users', userRouter)

/**Lauch server */
const server = app.listen(8080, () => {
    console.log("Server listening on port 8080")
})

module.exports = server
