import { Tenant } from '../api/tenant'
import { globalEventBus } from './globalEventBus'

// 直接存 localStorage，正常应该使用 域名 从后端获取租户信息
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
