import { httpClient } from './httpClient'

export interface Tenant {
  name: string
  logo: string
  domain: string
  adminId: string
  authingTenantId: string
  description?: string
}

export const registerTenant = async (tenant: Tenant) => {
  const res = await httpClient.post(`/api/tenant`, tenant)

  return res.data
}

export const fetchUserTenantList = async (userId: string) => {
  const res = await httpClient.get(`/api/user/tenant?userId=${userId}`)

  return res.data
}

export const fetchTenantByDomain = async (domain: string) => {
  const res = await httpClient.get(`/api/tenant-by-domain?domain=${domain}`)

  return res.data
}

export const fetchUsersOfTenant = async (
  tenantId: string,
  {
    page = 1,
    limit = 10,
  }: {
    page: number
    limit: number
  }
) => {
  const res = await httpClient.get(
    `/api/tenant/${tenantId}/users?page=${page}&limit=${limit}`
  )

  return res.data
}

export const removeMember = async (tenantId: string, userId: string) => {
  const res = await httpClient.delete(
    `/api/tenant/${tenantId}/members?userId=${userId}`
  )

  return res.data
}

export const fetchMemberPermissions = async (userId: string) => {
  const res = await httpClient.get(`/api/tenant/members/${userId}/permissions`)

  return res.data
}

export const addMember = async (
  tenantId: string,
  data: {
    email: string
    password: string
    username: string
  }
) => {
  const res = await httpClient.post(`/api/tenant/${tenantId}/members`, data)

  return res.data
}
