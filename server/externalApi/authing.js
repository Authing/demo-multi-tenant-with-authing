const axios = require('axios').default
const { authing } = require('../config')

const httpClient = axios.create()

async function fetchManagementToken(userPoolId, secret) {
  const res = await httpClient.post(
    `https://core.${authing.topLevelDomain}/graphql/v2`,
    {
      query: `
    query accessToken($userPoolId: String!, $secret: String!) {
  accessToken(userPoolId: $userPoolId, secret: $secret) {
    accessToken
    exp
    iat
  }
}
    `,
      variables: {
        userPoolId,
        secret,
      },
    }
  )

  return res.data.data.accessToken.accessToken
}

async function createTenant(token, tenantInfo) {
  try {
    const res = await httpClient.post(
      `${authing.appHost}/api/v2/tenant`,
      tenantInfo,
      {
        headers: {
          'x-authing-userpool-id': authing.userPoolId,
          Authorization: token,
        },
      }
    )

    return res.data.data
  } catch (e) {
    console.log(e)
    return null
  }
}

async function fetchUserTenants(token, id) {
  try {
    const res = await httpClient.get(
      `${authing.appHost}/api/v2/users/${id}/tenants`,
      {
        headers: {
          'x-authing-userpool-id': authing.userPoolId,
          Authorization: token,
        },
      }
    )

    return res.data.data.tenants
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

async function addUserToTenant(token, { userIds, tenantId }) {
  try {
    const res = await httpClient.post(
      `${authing.appHost}/api/v2/tenant/${tenantId}/user`,
      {
        userIds,
      },
      {
        headers: {
          'x-authing-userpool-id': authing.userPoolId,
          Authorization: token,
        },
      }
    )

    return res.data.data
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

async function fetchTenantUserList(token, { tenantId, page = 1, limit = 10 }) {
  try {
    const res = await httpClient.get(
      `${authing.appHost}/api/v2/tenant/${tenantId}/users`,
      {
        params: {
          page,
          limit,
        },
        headers: {
          'x-authing-userpool-id': authing.userPoolId,
          Authorization: token,
        },
      }
    )

    return res.data.data
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

async function fetchTenantDetail(token, tenantId) {
  try {
    const res = await httpClient.get(
      `${authing.appHost}/api/v2/tenant/${tenantId}`,
      {
        headers: {
          'x-authing-userpool-id': authing.userPoolId,
          Authorization: token,
        },
      }
    )

    return res.data.data
  } catch (e) {
    console.log(e, '>>>>')
    return null
  }
}

module.exports = {
  createTenant,
  addUserToTenant,
  fetchUserTenants,
  fetchTenantDetail,
  fetchTenantUserList,
  fetchManagementToken,
}
