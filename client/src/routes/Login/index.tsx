import { AuthingGuard } from '@authing/react-ui-components'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { APP_HOST, APP_ID } from '../../constants/authing'
import { getUserInfo, setUserInfo } from '../../utils/user'
import './styles.scss'

export const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (getUserInfo()) {
      navigate('/select-tenant')
    }
  }, [navigate])

  return (
    <div className="login-page">
      <AuthingGuard
        appId={APP_ID}
        config={{
          appHost: APP_HOST,
          localesConfig: {
            isShowChange: false,
          },
        }}
        onLogin={(user) => {
          setUserInfo(user)

          navigate('/select-tenant')
        }}
      />
    </div>
  )
}
