import { httpClient } from './httpClient'

export const getCurrentUser = async (token?: string) => {
  const res = await httpClient.get(`/api/user/me`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  })

  return res.data
}
