import { Tenant } from '../api/tenant'

export const setTenantInfo = (tenant: Tenant) => {
  return localStorage.setItem('tenant_info', JSON.stringify(tenant))
}
export const getTenantInfo = () => {
  return JSON.parse(
    localStorage.getItem('tenant_info') || 'null'
  ) as Tenant | null
}
export const clearTenantInfo = () => {
  return localStorage.removeItem('tenant_info')
}
