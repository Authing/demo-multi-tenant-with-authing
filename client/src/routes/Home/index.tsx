import { Header } from '../../components/Header'
import './styles.scss'

export const Home = () => {
  return (
    <div className="container">
      <nav>
        <img
          className="home-logo"
          src={require('../../assets/images/logo.png').default}
          alt="Logo"
        />
        <div className="nav-container">
          <span className="nav-item">产品</span>
          <span className="nav-item">解决方案</span>
          <span className="nav-item">客户案例</span>
          <span className="nav-item">价格</span>
          <span className="nav-item">支持</span>
        </div>

        <Header />
      </nav>
      <img className="home-page-demo" src="/images/home-demo.png" alt="" />
    </div>
  )
}
