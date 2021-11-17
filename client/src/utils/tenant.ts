import { Tenant } from '../api/tenant'
import { globalEventBus } from './globalEventBus'

export const setTenantInfo = (tenant: Tenant) => {
  localStorage.setItem('tenant_info', JSON.stringify(tenant))
  globalEventBus.emit('update-user-or-tenant-info')
}
export const getTenantInfo = () => {
  return JSON.parse(
    localStorage.getItem('tenant_info') || 'null'
  ) as Tenant | null
}
export const clearTenantInfo = () => {
  localStorage.removeItem('tenant_info')
  globalEventBus.emit('update-user-or-tenant-info')
}
