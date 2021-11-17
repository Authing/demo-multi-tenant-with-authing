import { Avatar, Button, Dropdown, Layout, Menu } from 'antd'
import { FC, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getTenantInfo } from '../../utils/tenant'
import { clearUserInfo, getUserInfo } from '../../utils/user'

export const UthingHeader: FC = ({ children }) => {
  const navigate = useNavigate()
  const tenantInfo = getTenantInfo()

  const user = useMemo(() => {
    return getUserInfo()
  }, [])

  return (
    <Layout.Header
      style={{
        backgroundColor: 'white',
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <img
        height="40px"
        src={
          tenantInfo?.logo || require('../../assets/images/logo.png').default
        }
        alt="Logo"
      />
      {children}
      {user ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="dashboard"
                  onClick={() => {
                    clearUserInfo()
                    navigate(
                      tenantInfo ? '/console/dashboard' : '/select-tenant'
                    )
                  }}
                >
                  控制台
                </Menu.Item>
                <Menu.Item
                  key="logout"
                  onClick={() => {
                    clearUserInfo()
                    navigate('/login')
                  }}
                >
                  退出登录
                </Menu.Item>
              </Menu>
            }
          >
            <Avatar
              style={{
                cursor: 'pointer',
                marginRight: 16,
              }}
              size={45}
              src={user.photo}
            ></Avatar>
          </Dropdown>

          <div
            style={{
              lineHeight: '1',
            }}
          >
            <div>{user?.name || '--'}</div>
            <div
              style={{
                color: '#8a92a6',
                marginTop: 8,
              }}
            >
              {user.email}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <Button
              style={{
                width: 100,
              }}
              size="large"
              type="primary"
            >
              登录
            </Button>
          </Link>
        </div>
      )}
    </Layout.Header>
  )
}
