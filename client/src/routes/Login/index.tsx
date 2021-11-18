import { Guard as AuthingGuard } from '@authing/react-ui-components'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { fetchTenantByDomain, Tenant } from '../../api/tenant'
import { APP_ID, CORE_API_HOST } from '../../constants/authing'
import { getTenantDomain } from '../../utils/getTenantDomain'
import { getUserInfo } from '../../utils/user'
import './styles.less'

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
  const [tenantInfo, setTenantInfo] = useState<Tenant | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getTenantInfo()
      .then((tenant) => {
        setTenantInfo(tenant)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (getUserInfo()) {
      navigate('/select-tenant')
    }
  }, [navigate])

  return (
    <div className="login-page">
      {loading ? (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          <Spin spinning={loading}></Spin>
        </div>
      ) : (
        <AuthingGuard
          appId={APP_ID}
          tenantId={tenantInfo?.authingTenantId}
          config={{
            host: CORE_API_HOST,
            // appHost: APP_HOST,
          }}
          onLogin={async (user) => {
            console.log(user, '>>>>>>>>>>>>')
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
      )}
    </div>
  )
}
