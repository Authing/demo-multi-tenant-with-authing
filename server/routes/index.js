var express = require('express')
const {
  createTenant,
  fetchUserTenants,
  addUserToTenant,
  fetchTenantUserList,
  fetchTenantDetail,
  removeMember,
  fetchMemberPermissions,
  createUser,
} = require('../externalApi/authing')
var router = express.Router()
const { authing } = require('../config')
const { tenantService } = require('../models/tenant.repository')
const { keyBy } = require('lodash')

// 创建租户
router.post('/api/tenant', async function (req, res, next) {
  const adminId = req.user.id
  const { name, logo, domain, description } = req.body
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

  return res.json({
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

    return res.json({
      code: 200,
      data: {
        ...tenantDetail,
        ...selfTenant,
      },
    })
  }

  return res.json({
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

  return res.json({
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

  return res.json({
    code: 200,
    data: data,
  })
})

// 删除用户
router.delete('/api/tenant/:tenantId/members', async function (req, res, next) {
  const data = await removeMember(req.params.tenantId, req.query.userId)

  return res.json({
    code: 200,
    data: data,
  })
})

// 获取成员权限
router.get(
  '/api/tenant/members/:memberId/permissions',
  async function (req, res, next) {
    const data = await fetchMemberPermissions(req.params.memberId)

    return res.json({
      code: 200,
      data: data,
    })
  }
)

// 创建用户，并将用户添加至某一个租户
router.post('/api/tenant/:tenantId/members', async function (req, res, next) {
  const user = await createUser(req.body)

  await addUserToTenant({
    userIds: [user.id],
    tenantId: req.params.tenantId,
  })

  return res.json({
    code: 200,
    data: user,
  })
})

// 获取当前登录的用户信息
router.get('/api/user/me', async function (req, res, next) {
  return res.json({
    code: 200,
    data: req.user,
  })
})

module.exports = router
