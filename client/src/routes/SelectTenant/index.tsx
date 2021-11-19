import { Modal, Spin, List, Avatar, Button } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchUserTenantList, Tenant } from '../../api/tenant'
import { getCurrentUser } from '../../api/user'
import { config } from '../../config'

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
                <Button
                  type="primary"
                  onClick={() => navigate(`/register${window.location.search}`)}
                >
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
                      href={`${window.location.protocol}//${tenant.domain}.${config.pageBaseHost}/token-set?token=${token}`}
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
            暂无组织，
            <Link to={`/register${window.location.search}`}>去创建</Link>
          </p>
        )}
      </Spin>
    </Modal>
  )
}
