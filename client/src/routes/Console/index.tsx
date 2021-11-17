import { Layout, Menu } from 'antd'
import {
  DashboardOutlined,
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
import { useMemo } from 'react'
import './styles.scss'
import { Setting } from './Setting'
import { User } from './User'

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
]

export const ConsolePage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const selectedKeys = useMemo(() => {
    return menus
      .filter((item) => matchPath(item.path, location.pathname))
      .map((item) => item.key)
  }, [location.pathname])

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
            <Route path="/user" element={<User />}></Route>
            <Route path="/setting" element={<Setting />}></Route>
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
