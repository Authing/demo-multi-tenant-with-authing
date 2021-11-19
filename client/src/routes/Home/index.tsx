import { Layout } from 'antd'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { GlobalContext } from '../../context/globalContext'
import { UthingHeader } from '../../components/Header'
import { getTenantDomain } from '../../utils/getTenantDomain'
import './styles.less'

export const Home = () => {
  const navigate = useNavigate()
  const { user } = useContext(GlobalContext)

  useEffect(() => {
    if (getTenantDomain()) {
      if (user) {
        navigate('/console/dashboard')
      } else {
        navigate('/login')
      }
    }
  }, [navigate, user])

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
