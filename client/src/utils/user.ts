import { User } from '@authing/react-ui-components'

export const setUserInfo = (user: User) => {
  return localStorage.setItem('user_info', JSON.stringify(user))
}
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem('user_info') || 'null') as User | null
}
export const clearUserInfo = () => {
  return localStorage.removeItem('user_info')
}
