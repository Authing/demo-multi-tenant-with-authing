import { Tabs } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import './styles.scss'

const tabs = [
  {
    key: 'oidc',
    title: 'OIDC 配置',
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
  const [activeKey, setActiveKey] = useState('oidc')

  const getCurrContent = useCallback(() => {
    switch (activeKey) {
      case 'oidc':
        return 'oidc'

      default:
        return <>Demo</>
    }
  }, [activeKey])

  return (
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
  )
}
