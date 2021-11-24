import { AuthingGuard } from '@authing/react-ui-components'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { config } from '../../config'
import { GlobalContext } from '../../context/globalContext'
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
        appId={config.authing.appId}
        tenantId={tenantInfo?.authingTenantId}
        config={{
          // host: CORE_API_HOST,
          appHost: config.authing.appHost,
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
