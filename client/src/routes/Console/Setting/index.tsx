import { Tabs } from 'antd'
import { useCallback, useContext, useState } from 'react'
import { GlobalContext } from '../../../context/globalContext'
import './styles.less'
import { GitlabConnection } from './GitlabConnection'

const tabs = [
  // {
  //   key: 'oidc',
  //   title: 'OIDC 配置',
  // },
  {
    key: 'gitlab',
    title: 'Gitlab 登录',
  },
  {
    key: 'project',
    title: '项目配置',
  },
  {
    key: 'member',
    title: '成员配置',
  },
  {
    key: 'advance',
    title: '高级配置',
  },
]

export const Setting = () => {
  const [activeKey, setActiveKey] = useState('gitlab')
  const { tenant } = useContext(GlobalContext)

  const getCurrContent = useCallback(() => {
    switch (activeKey) {
      case 'gitlab':
        return <GitlabConnection tenantId={tenant!.authingTenantId} />

      default:
        return <>Demo</>
    }
  }, [activeKey, tenant])

  return tenant ? (
    <div className="setting-page">
      <div className="setting-tabs">
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          style={{
            height: 81,
          }}
        >
          {tabs.map((item) => (
            <Tabs.TabPane tab={item.title} key={item.key} />
          ))}
        </Tabs>
      </div>

      <div className="setting-tab-content">{getCurrContent()}</div>
    </div>
  ) : (
    <></>
  )
}
