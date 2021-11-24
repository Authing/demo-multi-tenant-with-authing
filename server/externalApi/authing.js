const { ManagementClient } = require('authing-js-sdk')
const { authing } = require('../config')

const managementClient = new ManagementClient({
  userPoolId: authing.userPoolId,
  secret: authing.userPoolSecret,
  host: authing.host,
})

// 创建租户
async function createTenant(tenantInfo) {
  try {
    const res = await managementClient.tenant.create(tenantInfo)

    return res
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

// 获取某一个用户所在租户列表
async function fetchUserTenants(id) {
  try {
    const { tenants } = await managementClient.users.getUserTenants(id)
    return tenants
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

// 将用户添加至某一个租户
async function addUserToTenant({ userIds, tenantId }) {
  try {
    const res = await managementClient.tenant.addMembers(tenantId, userIds)

    return res
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

// 获取某一个租户下的用户列表
async function fetchTenantUserList({ tenantId, page = 1, limit = 10 }) {
  try {
    const res = await managementClient.tenant.members(tenantId, { page, limit })

    return res
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

// 获取租户详情
async function fetchTenantDetail(tenantId) {
  try {
    const res = await managementClient.tenant.details(tenantId)

    return res
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

// 移除租户成员
async function removeMember(tenantId, userId) {
  try {
    const res = await managementClient.tenant.removeMembers(tenantId, userId)

    return res
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

// 获取成员权限
async function fetchMemberPermissions(userId) {
  try {
    const res = await managementClient.users.listAuthorizedResources(
      userId,
      authing.appId
    )

    return res
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

// 创建用户
async function createUser(userInfo) {
  try {
    const res = await managementClient.users.create(userInfo)

    return res
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

// 获取用户详情
async function getUserDetail(id) {
  try {
    const res = await managementClient.users.detail(id)

    return res
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

// 获取租户身份源列表
async function getTenantConnections(id) {
  try {
    const res = await managementClient.tenant.listExtIdp(id)

    return res
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

// 获取身份源详情
async function getConnectionDetail(id) {
  try {
    const res = await managementClient.tenant.extIdpDetail(id)

    return res
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

// 给租户创建身份源
async function createTenantConnection(data) {
  try {
    const res = await managementClient.tenant.createExtIdp(data)

    return res
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}
// 更新租户身份源
async function updateTenantConnection(id, data) {
  try {
    const res = await managementClient.tenant.updateExtIdpConnection(id, data)

    return res
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}
// 修改租户身份源状态
async function changeTenantState(id, data) {
  try {
    const res = await managementClient.tenant.changeExtIdpConnectionState(
      id,
      data
    )

    return res
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

module.exports = {
  createUser,
  removeMember,
  createTenant,
  getUserDetail,
  addUserToTenant,
  fetchUserTenants,
  fetchTenantDetail,
  changeTenantState,
  getConnectionDetail,
  fetchTenantUserList,
  getTenantConnections,
  createTenantConnection,
  updateTenantConnection,
  fetchMemberPermissions,
}
