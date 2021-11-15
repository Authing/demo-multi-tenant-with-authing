import { Button } from 'antd'
import { useState } from 'react'
import { User } from '../../api/user'

export const Header = () => {
  const [user, setUser] = useState<User | null>(null)

  return user ? (
    <div className="console-header-actions">
      <img
        id="dropdownTrigger"
        className="console-avatar"
        src="<%=user.avatar%>"
        alt="Avatar"
      />
      <div id="dropdown" className="header-dropdown">
        <a href="/api/logout" className="dropdown-item">
          退出登录
        </a>
      </div>
      <div>
        <span className="console-username">{user?.name || '--'}</span>
        <span className="console-email">{user.email}</span>
      </div>
    </div>
  ) : (
    <div>
      <Button>登录</Button>
    </div>
  )
}
