import { AuthingGuard } from '@authing/react-ui-components'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { fetchTenantByDomain, Tenant } from '../../api/tenant'
import { APP_HOST, APP_ID } from '../../constants/authing'
import { getTenantDomain } from '../../utils/getTenantDomain'
import { getUserInfo } from '../../utils/user'
import './styles.scss'

const getTenantInfo = async () => {
  const tenantDomain = getTenantDomain()

  if (!tenantDomain) {
    return
  }

  return fetchTenantByDomain(tenantDomain).then((res) => {
    return res.data as Tenant
  })
}

export const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (getUserInfo()) {
      navigate('/select-tenant')
    }
  }, [navigate])

  return (
    <div className="login-page">
      <AuthingGuard
        appId={APP_ID}
        config={{
          appHost: APP_HOST,
          localesConfig: {
            isShowChange: false,
          },
        }}
        onLogin={async (user) => {
          const tenantInfo = await getTenantInfo()
          if (tenantInfo) {
            navigate(
              `/console/dashboard?user_info=${JSON.stringify(
                user
              )}&tenant_info=${JSON.stringify(tenantInfo)}`
            )
          } else {
            navigate(`/select-tenant?user_info=${JSON.stringify(user)}`)
          }
        }}
      />
    </div>
  )
}
