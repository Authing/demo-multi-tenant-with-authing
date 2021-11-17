import { Modal, Spin, List, Avatar, Button } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchUserTenantList, Tenant } from '../../api/tenant'
import { config } from '../../config'

export const SelectTenant = () => {
  const [loading, setLoading] = useState(false)
  const [tenantList, setTenantList] = useState<Tenant[] | null>([])
  const navigate = useNavigate()
  const userInfo = useMemo(() => {
    const url = new URL(window.location.href)
    return JSON.parse(url.searchParams.get('user_info') || 'null')
  }, [])

  useEffect(() => {
    setLoading(true)

    if (userInfo) {
      fetchUserTenantList(userInfo.id)
        .then((res) => {
          setTenantList(res.data as Tenant[])
        })
        .finally(() => setLoading(false))
    }
  }, [userInfo])

  return (
    <Modal
      centered
      footer={null}
      visible
      mask={false}
      closable={false}
      width={500}
    >
      <Spin spinning={loading}>
        {tenantList?.length ? (
          <List
            itemLayout="horizontal"
            dataSource={tenantList}
            loadMore={
              <div
                style={{
                  textAlign: 'center',
                  marginTop: 24,
                  height: 32,
                  lineHeight: '32px',
                }}
              >
                <Button type="primary" onClick={() => navigate('/register')}>
                  去创建
                </Button>
              </div>
            }
            renderItem={(tenant) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={tenant.logo} />}
                  title={
                    <a
                      href={`${window.location.protocol}//${tenant.domain}.${
                        config.pageBaseHost
                      }/console/dashboard?user_info=${JSON.stringify(
                        userInfo
                      )}&tenant_info=${JSON.stringify(tenant)}`}
                    >
                      {tenant.name}
                    </a>
                  }
                  description={tenant.description || '--'}
                />
              </List.Item>
            )}
          />
        ) : (
          <p>
            暂无组织，<Link to={'/register'}>去创建</Link>
          </p>
        )}
      </Spin>
    </Modal>
  )
}
