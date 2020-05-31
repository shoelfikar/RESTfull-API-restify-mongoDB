// 'use strict'


// module.exports = function(ctx){
//   const client = ctx.client
//   const server = ctx.server
//   const database = client.db('booklibrary')
//   const collection = database.collection('users')

  
//   server.get('/books', async (req, res, next) => {
//     try{
//       const user = await collection.find().pretty()
//       res.json(user)
//       next()
//     } catch(err){
//       return next(err)
//     }
// })

//   server.post('/books', (req, res, next) => {
//     const {name, email, status} = req.body
//     const data = ({
//       name: name,
//       email:email,
//       status: status,
//       created: new Date(),
//       updated: new Date()
//     })

//     collection.insertOne(data)
//       .then(doc => res.send (200, doc.ops[0]))
//       .catch(err => res.send(500, err))
//       next()
//   })
// }

const error = require('restify-errors')
const db = require('./config')
module.exports = users => {
  users.get('/user', async (req, res, next) => {
    try{
      db.getDB().collection('users').find({}).toArray((err, document) => {
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
}