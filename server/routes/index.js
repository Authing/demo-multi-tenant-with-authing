var express = require('express')
const {
  fetchManagementToken,
  createTenant,
  fetchUserTenants,
  addUserToTenant,
  fetchTenantUserList,
  fetchTenantDetail,
} = require('../externalApi/authing')
var router = express.Router()
const { authing } = require('../config')
const { tenantService } = require('../models/tenant.repository')
const { keyBy } = require('lodash')

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

  await addUserToTenant(accessToken, {
    userIds: [adminId],
    tenantId: tenant.id,
  })

  console.log({
    authingTenantId: tenant.id,
    domain,
    adminId,
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

// 获取租户详情
router.get('/api/tenant-by-domain', async function (req, res, next) {
  const { domain } = req.query
  const selfTenant = (await tenantService.findByDomain(domain)).dataValues

  const accessToken = await fetchManagementToken(
    authing.userPoolId,
    authing.userPoolSecret
  )

  const tenantDetail = await fetchTenantDetail(
    accessToken,
    selfTenant.authingTenantId
  )

  res.json({
    code: 200,
    data: {
      ...tenantDetail,
      ...selfTenant,
    },
  })
})

// 获取用户所在租户列表
router.get('/api/user/tenant', async function (req, res, next) {
  const accessToken = await fetchManagementToken(
    authing.userPoolId,
    authing.userPoolSecret
  )

  const { userId } = req.query

  const list = (await fetchUserTenants(accessToken, userId)) || []
  const ids = list.map((item) => item.id)
  const tenantMaps = keyBy(
    await tenantService.findByAuthingIds(ids),
    'authingTenantId'
  )

  res.json({
    code: 200,
    data: list
      ?.map((item) => ({
        ...item,
        domain: tenantMaps[item.id]?.domain,
        adminId: tenantMaps[item.id]?.adminId,
        authingTenantId: tenantMaps[item.id]?.authingTenantId,
      }))
      .filter((item) => item.domain),
  })
})

// 获取租户下的成员列表
router.get('/api/tenant/:tenantId/users', async function (req, res, next) {
  const accessToken = await fetchManagementToken(
    authing.userPoolId,
    authing.userPoolSecret
  )

  const data = await fetchTenantUserList(accessToken, {
    tenantId: req.params.tenantId,
    page: req.query.page,
    limit: req.query.limit,
  })

  res.json({
    code: 200,
    data: data,
  })
})

module.exports = router
