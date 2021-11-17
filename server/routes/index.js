var express = require('express')
const {
  fetchManagementToken,
  createTenant,
  fetchUserTenants,
} = require('../externalApi/authing')
var router = express.Router()
const { authing } = require('../config')
const { tenantService } = require('../models/tenant.repository')

// 创建租户
router.post('/api/tenant', async function (req, res, next) {
  const accessToken = await fetchManagementToken(
    authing.userPoolId,
    authing.userPoolSecret
  )

  const { name, logo, domain, description, adminId } = req.body
  const tenant = await createTenant(accessToken, {
    appIds: authing.appId,
    name,
    logo,
    description,
  })

  const tenantMap = await tenantService.insert({
    authingTenantId: tenant.id,
    domain,
    adminId,
  })

  res.json({
    code: 200,
    data: tenantMap,
  })
})

// 获取用户所在租户列表
router.get('/api/user/tenant', async function (req, res, next) {
  const accessToken = await fetchManagementToken(
    authing.userPoolId,
    authing.userPoolSecret
  )

  const { userId } = req.query

  const list = await fetchUserTenants(accessToken, userId)

  res.json({
    code: 200,
    data: list,
  })
})

module.exports = router
