// module.exports = {
//   ENV: process.env.NODE_ENV || 'development',
//   PORT: process.env.PORT || 3000,
//   URL: process.env.BASE_URL || 'http://localhost:3000',
//   MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ssl=false',
//   JWT_SECRET: process.env.JWT_SECRET || 'secret1'
// }

const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const dbName = 'booklibrary'
const url = 'mongodb://127.0.0.1:27017/ssl=false'
const mongoOptions = {useNewUrlParser : true}

const state = {
  db : null
}

const connect = (cb)  => {
  if(state.db)
    cb()
  else{
    MongoClient.connect(url,mongoOptions, (err, client)=> {
      if(err)
        cb(err)
      else{
        state.db = client.db(dbName)
        cb()
      }
    })
  }
}

const getPrimaryKey = (_id) => {
  return ObjectID(_id)
}

const getDB = () => {
  return state.db
}

module.exports = {getDB,connect,getPrimaryKey}