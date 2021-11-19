import { Layout, Menu } from 'antd'
import {
  DashboardOutlined,
  ExclamationCircleOutlined,
  FileProtectOutlined,
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
import { useContext, useEffect, useMemo } from 'react'
import './styles.less'
import { Setting } from './Setting'
import { UserPage } from './User'
import { Tenant } from './Tenant'
import { Permission } from './Permission'
import { GlobalContext, IGlobalContext } from '../../context/globalContext'

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
    title: '成员管理',
    path: '/console/user',
  },
  {
    key: 'tenantInfo',
    icon: <ExclamationCircleOutlined />,
    title: '企业信息',
    path: '/console/tenant',
  },
  {
    key: 'permission',
    icon: <FileProtectOutlined />,
    title: '权限信息',
    path: '/console/permission',
  },
  {
    key: 'setting',
    icon: <SettingOutlined />,
    title: '配置',
    path: '/console/setting',
  },
]

export const ConsolePage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { user, tenant } = useContext<IGlobalContext>(GlobalContext)

  const selectedKeys = useMemo(() => {
    return menus
      .filter((item) => matchPath(item.path, location.pathname))
      .map((item) => item.key)
  }, [location.pathname])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (!tenant) {
      navigate('/select-tenant')
    }
  }, [navigate, tenant, user])

  return !user || !tenant ? (
    <></>
  ) : (
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
            <Route path="/permission" element={<Permission />}></Route>
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
