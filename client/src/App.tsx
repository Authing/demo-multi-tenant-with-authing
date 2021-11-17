import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ConsolePage } from './routes/Console'
import { Home } from './routes/Home'
import { Login } from './routes/Login'
// 引入 Authing Guard css 文件
import '@authing/react-ui-components/lib/index.min.css'
import { Register } from './routes/Register'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { SelectTenant } from './routes/SelectTenant'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/console/*" element={<ConsolePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/select-tenant" element={<SelectTenant />}></Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
