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
  getTenantConnections,
  createTenantConnection,
  changeTenantState,
  updateTenantConnection,
  getConnectionDetail,
} = require('../externalApi/authing')
var router = express.Router()
const { authing } = require('../config')
const { tenantService } = require('../models/tenant.repository')
const { keyBy } = require('lodash')

// TODO，API 都需要鉴权

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

// 获取租户的 Gitlab 身份源连接详情
router.get(
  '/api/tenant/:tenantId/connections',
  async function (req, res, next) {
    const conns = await getTenantConnections(req.params.tenantId)
    if (!conns?.length) {
      return res.json({
        code: 200,
        data: null,
      })
    }

    const detail = await getConnectionDetail(conns[0].id)

    return res.json({
      code: 200,
      data: detail?.connections?.[0],
    })
  }
)

// 创建 GitLab 身份源连接
router.post(
  '/api/tenant/:tenantId/connections',
  async function (req, res, next) {
    const {
      name,
      displayName,
      type,
      identifier,
      clientID,
      clientSecret,
      baseURL,
      connectionType,
    } = req.body

    const created = await createTenantConnection({
      tenantId: req.params.tenantId,
      name,
      type,
      connections: [
        {
          type: connectionType,
          identifier,
          displayName,
          fields: {
            clientID,
            clientSecret,
            displayName,
            baseURL,
          },
        },
      ],
    })

    // 创建成功后开启
    await changeTenantState(created.connections[0].id, {
      tenantId: req.params.tenantId,
      enabled: true,
    })

    return res.json({
      code: 200,
      data: created,
    })
  }
)

// 更新 GitLab 身份源连接
router.put(
  '/api/tenant/connections/:connectionId',
  async function (req, res, next) {
    const { clientID, clientSecret, displayName, baseURL } = req.body

    return res.json({
      code: 200,
      data: await updateTenantConnection(req.params.connectionId, {
        displayName,
        fields: {
          baseURL,
          clientSecret,
          clientID,
          displayName,
        },
      }),
    })
  }
)

module.exports = router
