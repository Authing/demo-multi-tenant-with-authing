import { PlusOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUserTenantList, Tenant } from '../../api/tenant'
import { getCurrentUser } from '../../api/user'
import './styles.less'
import { TenantCard } from './TenantCard'

export const SelectTenant = () => {
  const [loading, setLoading] = useState(false)
  const [tenantList, setTenantList] = useState<Tenant[] | null>([])
  const navigate = useNavigate()
  const token = useMemo(() => {
    const url = new URL(window.location.href)
    return url.searchParams.get('token')
  }, [])

  useEffect(() => {
    setLoading(true)

    if (!token) {
      navigate('/login')
      return
    }

    getCurrentUser(token)
      .then(async (res) => {
        return fetchUserTenantList(res.data.id).then((res) => {
          setTenantList(res.data as Tenant[])
        })
      })
      .finally(() => setLoading(false))
  }, [navigate, token])

  return (
    <>
      <div className="tenant-page">
        <header
          style={{
            paddingTop: '16px',
          }}
        >
          <img
            height="40px"
            src={require('../../assets/images/logo.png').default}
            alt="Logo"
            style={{
              borderRadius: 8,
            }}
          />
        </header>
        <h1
          style={{
            fontSize: 24,
            marginTop: 82,
            marginBottom: 32,
          }}
        >
          选择企业
        </h1>
        <Spin spinning={loading}>
          <div className="tenant-list-container">
            <div
              onClick={() => navigate(`/register${window.location.search}`)}
              className="tenant-card"
            >
              <div
                style={{
                  color: '#8A92A6',
                  textAlign: 'center',
                }}
              >
                <PlusOutlined />
                <p
                  style={{
                    marginTop: 4,
                    marginBottom: 0,
                  }}
                >
                  创建
                </p>
              </div>
            </div>
            {Boolean(tenantList?.length) &&
              tenantList!.map((item) => {
                return (
                  <TenantCard
                    key={item.authingTenantId}
                    tenant={item}
                    token={token as string}
                  />
                )
              })}
          </div>
        </Spin>
      </div>
    </>
  )
}
