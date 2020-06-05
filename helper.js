const data = (data) => ({err: null, data})
const error = (err) => ({err, data: null})
const response = (res, type, result, message = '', responseCode = 200) => {
  let status = true
  // let data = result.data
  let code = responseCode
  if(type === 'fail') {
    // const errCode = checkErrorCode(result.err)
    res.send(responseCode, {
      success: false,
      result,
      message,
      code
    })
  }
  res.send(responseCode, {
    success: status,
    result,
    message,
    code
  })
}

module.exports = {
  data,
  error,
  response
}