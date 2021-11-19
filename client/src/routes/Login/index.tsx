import { Guard as AuthingGuard } from '@authing/react-ui-components'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { GlobalContext } from '../../context/globalContext'
import { APP_ID, CORE_API_HOST } from '../../constants/authing'
import './styles.less'

export const Login = () => {
  const navigate = useNavigate()
  const { tenant: tenantInfo } = useContext(GlobalContext)

  useEffect(() => {
    // if (getUserInfo()) {
    //   navigate('/select-tenant')
    // }
  }, [navigate])

  return (
    <div className="login-page">
      <AuthingGuard
        appId={APP_ID}
        tenantId={tenantInfo?.authingTenantId}
        config={{
          host: CORE_API_HOST,
          // appHost: APP_HOST,
        }}
        onLogin={async (user) => {
          if (tenantInfo) {
            navigate(`/token-set?token=${user.token}`)
          } else {
            navigate(`/select-tenant?token=${user.token}`)
          }
        }}
      />
    </div>
  )
}
