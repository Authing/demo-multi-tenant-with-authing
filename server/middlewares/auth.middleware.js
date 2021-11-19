const jwt = require('jsonwebtoken')
const config = require('../config')
const { getUserDetail } = require('../externalApi/authing')

module.exports = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, config.authing.appSecret)
    req.user = await getUserDetail(decoded.sub)
    next()
  } catch (err) {
    console.log('未登录', err)
    next()
  }
}
