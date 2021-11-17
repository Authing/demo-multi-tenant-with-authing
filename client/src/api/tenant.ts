import { httpClient } from './httpClient'

export interface Tenant {
  name: string
  logo: string
  domain: string
  adminId: string
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
