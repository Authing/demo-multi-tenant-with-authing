import { Layout, Menu } from 'antd'
import {
  DashboardOutlined,
  ExclamationCircleOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import {
  matchPath,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router'
import { UthingHeader } from '../../components/Header'
import { useEffect, useMemo } from 'react'
import './styles.scss'
import { Setting } from './Setting'
import { UserPage } from './User'
import { getTenantInfo, setTenantInfo } from '../../utils/tenant'
import { getUserInfo, setUserInfo } from '../../utils/user'
import { Tenant } from './Tenant'

const menus = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    title: '控制台',
    path: '/console/dashboard',
  },
  {
    key: 'user',
    icon: <TeamOutlined />,
    title: '用户管理',
    path: '/console/user',
  },
  {
    key: 'setting',
    icon: <SettingOutlined />,
    title: '配置',
    path: '/console/setting',
  },
  {
    key: 'tenantInfo',
    icon: <ExclamationCircleOutlined />,
    title: '企业信息',
    path: '/console/tenant',
  },
]

export const ConsolePage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const selectedKeys = useMemo(() => {
    return menus
      .filter((item) => matchPath(item.path, location.pathname))
      .map((item) => item.key)
  }, [location.pathname])

  useEffect(() => {
    const url = new URL(window.location.href)

    const userInfo = JSON.parse(url.searchParams.get('user_info') || 'null')
    const tenantInfo = JSON.parse(url.searchParams.get('tenant_info') || 'null')

    if (userInfo && tenantInfo) {
      setTenantInfo(tenantInfo)
      setUserInfo(userInfo)
    } else if (!getTenantInfo() || !getUserInfo()) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <Layout
      className="console-page"
      style={{
        height: '100vh',
      }}
    >
      <UthingHeader />
      <Layout>
        <Layout.Sider
          style={{
            borderTop: '1px solid #e9ecef',
          }}
          theme="light"
          width="258px"
        >
          <Menu selectedKeys={selectedKeys}>
            {menus.map((item) => (
              <Menu.Item
                onClick={() => navigate(item.path)}
                key={item.key}
                icon={item.icon}
              >
                {item.title}
              </Menu.Item>
            ))}
          </Menu>
        </Layout.Sider>
        <Layout.Content
          style={{
            flex: 1,
            padding: 25,
            overflow: 'auto',
          }}
        >
          <Routes>
            <Route
              path="/dashboard"
              element={
                <img
                  width="100%"
                  className="dashboard-sample-img"
                  src={
                    require('../../assets/images/dashboard-sample.png').default
                  }
                  alt=""
                ></img>
              }
            ></Route>
            <Route path="/user" element={<UserPage />}></Route>
            <Route path="/setting" element={<Setting />}></Route>
            <Route path="/tenant" element={<Tenant />}></Route>
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
