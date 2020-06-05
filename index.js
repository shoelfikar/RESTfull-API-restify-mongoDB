const restify = require('restify')
const config = require('./config')
const mongodb = require('mongodb').MongoClient
const error = require('restify-errors')
const router = require('./router')
const port = 5000
const server = restify.createServer()

server.use(restify.plugins.bodyParser())

//router endpoint user
server.get('/user', router.getUsers )
server.post('/user', router.createUser)
server.put('/user/:id', router.updateUser)
server.del('/user/:id', router.deleteUser )
server.get('/user/:id', router.getDetailUser)

server.get('/', (req,res)=>{
  res.send('welcome to my api')
})


config.connect((err)=> {
  if(err){
    console.log('unable to connect to database')
    process.exit(1)
  } else{
    server.listen(port, ()=>{
      console.log(`connected to database, app listening on port ${port}`)
    })
  }
})