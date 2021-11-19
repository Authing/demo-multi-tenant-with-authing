import React, { useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ConsolePage } from './routes/Console'
import { Home } from './routes/Home'
import { Login } from './routes/Login'
// 引入 Authing Guard css 文件
import '@authing/react-ui-components/lib/index.min.css'
import { Register } from './routes/Register'
import { ConfigProvider, Spin } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { SelectTenant } from './routes/SelectTenant'
import { getCurrentUser } from './api/user'
import { User } from '@authing/react-ui-components'
import { fetchTenantByDomain, Tenant } from './api/tenant'
import { getTenantDomain } from './utils/getTenantDomain'
import { GlobalContext } from './context/globalContext'
import { TokenSet } from './components/TokenSet'

function App() {
  const [user, setUser] = React.useState<User>()
  const [tenant, setTenant] = React.useState<Tenant>()
  const [isLoading, setIsLoading] = React.useState(true)
  const tenantDomain = getTenantDomain()

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res.data) {
          setUser(res.data)
        }
      })
      .then(() => {
        if (tenantDomain) {
          return fetchTenantByDomain(tenantDomain).then((res) =>
            setTenant(res.data)
          )
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [tenantDomain])

  return (
    <ConfigProvider locale={zhCN}>
      <GlobalContext.Provider
        value={{
          user,
          tenant,
        }}
      >
        <BrowserRouter>
          {isLoading ? (
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
              <Spin spinning={isLoading}></Spin>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/token-set" element={<TokenSet />}></Route>
              <Route path="/console/*" element={<ConsolePage />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/select-tenant" element={<SelectTenant />}></Route>
            </Routes>
          )}
        </BrowserRouter>
      </GlobalContext.Provider>
    </ConfigProvider>
  )
}

export default App
