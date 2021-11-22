import { Descriptions, Empty, Tag } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../context/globalContext'
import { fetchMemberPermissions } from '../../../api/tenant'

export const Permission = () => {
  const [permissions, setPermissions] = useState<string[]>([])
  const { user } = useContext(GlobalContext)

  useEffect(() => {
    if (!user) {
      return
    }
    fetchMemberPermissions(user.id).then((res) => {
      setPermissions(
        res.data.list
          .map((item: any) => {
            return item.actions
          })
          .flat()
      )
    })
  }, [user])

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
          {permissions?.length ? (
            permissions.map((item) => {
              return (
                <Tag color="green" key={item}>
                  {item}
                </Tag>
              )
            })
          ) : (
            <Empty description="无权限信息" />
          )}
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}
