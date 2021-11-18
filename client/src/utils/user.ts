import { User } from '@authing/react-ui-components'
import { globalEventBus } from './globalEventBus'

// 直接存 localStorage，正常应该使用 token 从后端获取用户信息
export const setUserInfo = (user: User) => {
  localStorage.setItem('user_info', JSON.stringify(user))
  globalEventBus.emit('update-user-or-tenant-info')
}
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem('user_info') || 'null') as User | null
}
export const clearUserInfo = () => {
  localStorage.removeItem('user_info')
  globalEventBus.emit('update-user-or-tenant-info')
}
