import qs from 'query-string'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

export const TokenSet = () => {
  const location = useLocation()

  useEffect(() => {
    const query = qs.parse(location.search)
    if (query.token) {
      localStorage.setItem('authorization_token', query.token as string)
    }

    window.location.pathname = '/console/dashboard'
  }, [location.search])

  return <></>
}
