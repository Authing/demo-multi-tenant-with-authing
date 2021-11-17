import { Modal, Spin, List, Avatar, Button } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchUserTenantList, Tenant } from '../../api/tenant'
import { setTenantInfo } from '../../utils/tenant'
import { getUserInfo } from '../../utils/user'

export const SelectTenant = () => {
  const [loading, setLoading] = useState(false)
  const [tenantList, setTenantList] = useState<Tenant[] | null>([])
  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = getUserInfo()
    setLoading(true)

    if (userInfo) {
      fetchUserTenantList(userInfo.id)
        .then((res) => {
          setTenantList(res.data as Tenant[])
        })
        .finally(() => setLoading(false))
    }
  }, [])

  return (
    <Spin spinning={loading}>
      <Modal
        centered
        footer={null}
        visible
        mask={false}
        closable={false}
        width={500}
      >
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
                    <Link
                      to={`/console/dashboard`}
                      onClick={() => {
                        setTenantInfo(tenant)
                      }}
                    >
                      {tenant.name}
                    </Link>
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
      </Modal>
    </Spin>
  )
}
