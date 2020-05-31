const restify = require('restify')
const config = require('./config')
const users = require('./router')
const mongodb = require('mongodb').MongoClient
const error = require('restify-errors')
const port = 3000

const server = restify.createServer()

server.use(restify.plugins.bodyParser())

//Get Data
server.get('/user', async (req, res, next) => {
  try{
    await config.getDB().collection('users').find({}).toArray((err, document) => {
      if(err)
        console.log(err)
      else{
        res.json(document)
      }
    })
  } catch(err){
    return next(new error.InvalidContentError(err))
  }
})

//Create Data
server.post('/user', async (req, res, next) => {
  try{
    const {name, email, status} = req.body
    const data = ({
      name: name,
      email:email,
      status: status,
      created: new Date(),
      updated: new Date()
    })
    await config.getDB().collection('users').insertOne(data, (err, result) => {
      if(err)
        console.log(err)
      else{
        res.json({result: result, document: result.ops[0]})
      }
    })
  }catch(err){
    return next(new error.InvalidContentError(err))
  }
})

//Update Data
server.patch('/user/:id', async (req, res, next) => {
  try{
    const userID = req.params.id
    const {name, email, status} = req.body
    // const data = ({
    //   name: name,
    //   email:email,
    //   status: status,
    //   updated: new Date()
    // })
    await config.getDB().collection('users').findOneAndUpdate({_id: config.getPrimaryKey(userID)}, {$set : {
      name: name,
      email:email,
      status: status,
      updated: new Date()
    }}, {returnOriginal : false}, (err, result) => {
      if(err){
        console.log(err)
      }else{
        res.json(result)
      }
    })
  } catch(err){
    return next(new error.InvalidContentError(err))
  }
})

//Delete Data
server.del('/user/:id', async (req, res, next) => {
  try{
    const userID = req.params.id
    await config.getDB().collection('users').findOneAndDelete({_id: config.getPrimaryKey(userID)}, (err, result) => {
      if(err){
        console.log(err)
      }else{
        res.json(result)
      }
    })
  }catch(err){
    return next(new error.InvalidContentError(err))
  }
})

//Get Detail Data
server.get('/user/:id', async (req, res, next) => {
  try{
    const userID = req.params.id
    await config.getDB().collection('users').findOne({_id: config.getPrimaryKey(userID)}, (err, result) => {
      if(err){
        console.log(err)
      }else{
        res.json(result)
      }
    })
  }catch(err){
    return next(new error.InvalidContentError(err))
  }
})

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