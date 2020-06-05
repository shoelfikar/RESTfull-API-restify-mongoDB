const config = require('./config')
const error = require('restify-errors')

const getUsers = async (req, res, next) => {
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
}

const getDetailUser = async (req, res, next) => {
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
}

const createUser = async (req, res, next) => {
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
}

const updateUser = async (req, res, next) => {
  try{
    const userID = req.params.id
    const {name, email, status} = req.body
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
}

const deleteUser = async (req, res, next) => {
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
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getDetailUser
}