var express = require('express')
const {
  createTenant,
  fetchUserTenants,
  addUserToTenant,
  fetchTenantUserList,
  fetchTenantDetail,
  removeMember,
  fetchMemberPermissions,
} = require('../externalApi/authing')
var router = express.Router()
const { authing } = require('../config')
const { tenantService } = require('../models/tenant.repository')
const { keyBy } = require('lodash')

// 创建租户
router.post('/api/tenant', async function (req, res, next) {
  const { name, logo, domain, description, adminId } = req.body
  const tenant = await createTenant({
    appIds: authing.appId,
    name,
    logo,
    description,
  })

  await addUserToTenant({
    userIds: [adminId],
    tenantId: tenant.id,
  })

  const tenantMap = await tenantService.insert({
    authingTenantId: tenant.id,
    domain,
    adminId,
  })

  res.json({
    code: 200,
    data: {
      ...tenant,
      ...tenantMap.dataValues,
    },
  })
})

// 获取租户详情
router.get('/api/tenant-by-domain', async function (req, res, next) {
  const { domain } = req.query
  const selfTenant = (await tenantService.findByDomain(domain))?.dataValues

  if (selfTenant) {
    const tenantDetail = await fetchTenantDetail(selfTenant.authingTenantId)

    res.json({
      code: 200,
      data: {
        ...tenantDetail,
        ...selfTenant,
      },
    })
  }

  res.json({
    code: 200,
    data: null,
  })
})

// 获取用户所在租户列表
router.get('/api/user/tenant', async function (req, res, next) {
  const { userId } = req.query

  const list = (await fetchUserTenants(userId)) || []
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
  const data = await fetchTenantUserList({
    tenantId: req.params.tenantId,
    page: req.query.page,
    limit: req.query.limit,
  })

  res.json({
    code: 200,
    data: data,
  })
})

// 删除用户
router.delete('/api/tenant/:tenantId/members', async function (req, res, next) {
  const data = await removeMember(req.params.tenantId, req.query.userId)

  res.json({
    code: 200,
    data: data,
  })
})

// 获取成员权限
router.get(
  '/api/tenant/members/:memberId/permissions',
  async function (req, res, next) {
    const data = await fetchMemberPermissions(req.params.memberId)

    res.json({
      code: 200,
      data: data,
    })
  }
)

module.exports = router
