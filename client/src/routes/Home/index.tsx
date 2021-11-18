import { Layout } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { UthingHeader } from '../../components/Header'
import { getTenantDomain } from '../../utils/getTenantDomain'
import { getUserInfo } from '../../utils/user'
import './styles.less'

export const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (getTenantDomain()) {
      if (getUserInfo()) {
        navigate('/console/dashboard')
      } else {
        navigate('/login')
      }
    }
  }, [navigate])

  return (
    <Layout className="home-page">
      <nav>
        <UthingHeader>
          <div className="nav-container">
            <span className="nav-item">产品</span>
            <span className="nav-item">解决方案</span>
            <span className="nav-item">客户案例</span>
            <span className="nav-item">价格</span>
            <span className="nav-item">支持</span>
          </div>
        </UthingHeader>
      </nav>
      <img
        className="home-page-demo"
        src={require('../../assets/images/home-demo.png').default}
        alt=""
      />
    </Layout>
  )
}
