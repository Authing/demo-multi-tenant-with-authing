import { Descriptions, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { fetchMemberPermissions } from '../../../api/tenant'
import { getUserInfo } from '../../../utils/user'

export const Permission = () => {
  const [permissions, setPermissions] = useState<string[]>([])

  useEffect(() => {
    const userInfo = getUserInfo()

    if (!userInfo) {
      return
    }
    fetchMemberPermissions(userInfo.id).then((res) => {
      setPermissions(
        res.data.list
          .map((item: any) => {
            return item.actions
          })
          .flat()
      )
    })
  }, [])

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 8,
        padding: '56px 47px',
        height: '100%',
      }}
    >
      <Descriptions bordered title="权限信息" layout="vertical">
        <Descriptions.Item label="所有权限">
          {permissions.map((item) => {
            return (
              <Tag color="green" key={item}>
                {item}
              </Tag>
            )
          })}
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}
