const config = require('./config')
const error = require('restify-errors')
const helpers = require('./helper')
const getUsers = async (req, res, next) => {
  try{
    await config.getDB().collection('users').find({}).toArray((err, document) => {
      if(document.length == 0)
      return next(new error.InvalidContentError('no users for get'))
      else{
        helpers.response(res, 'success', document, 'get users success!')
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
      if(result == null || err){
        return next(new error.InvalidHeaderError('cant find the user'))
      }else{
        helpers.response(res, 'success', result, 'get user success!')
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
      return next(new error.InvalidHeaderError('cant create user'))
      else{
        helpers.response(res, 'success', result.ops, 'create user success!')
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
        return next(new error.InvalidHeaderError('cant update user'))
      }else{
        helpers.response(res, 'success', result.value, 'update user success!')
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
        return next(new error.InvalidHeaderError('cant delete user'))
      }else{
        helpers.response(res, 'success', result, 'delet user success!')
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