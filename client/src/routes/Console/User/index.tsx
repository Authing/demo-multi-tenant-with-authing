import { User } from '@authing/react-ui-components'
import { Avatar, Empty, Table } from 'antd'
import { useEffect, useState } from 'react'
import { fetchUsersOfTenant } from '../../../api/tenant'
import { getTenantInfo } from '../../../utils/tenant'
import { getUserInfo } from '../../../utils/user'

const pageSize = 10

export const UserPage = () => {
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [userList, setUserList] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const tenantInfo = getTenantInfo()
  const userInfo = getUserInfo()

  useEffect(() => {
    const tenantInfo = getTenantInfo()
    if (tenantInfo) {
      setLoading(true)
      fetchUsersOfTenant(tenantInfo.authingTenantId, {
        page,
        limit: pageSize,
      })
        .then((res) => {
          setUserList(res.data.list.map((item: any) => item.user))
          setTotal(res.data.listTotal)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [page])

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 8,
        padding: '56px 47px',
        height: '100%',
      }}
    >
      {tenantInfo?.adminId === userInfo?.id ? (
        <Table
          rowKey="id"
          loading={loading}
          pagination={{
            current: page,
            pageSize,
            total,
            hideOnSinglePage: true,
            onChange: setPage,
          }}
          dataSource={userList}
          columns={[
            {
              title: '头像',
              dataIndex: 'photo',
              render: (value, record) => {
                return <Avatar src={value}></Avatar>
              },
            },
            {
              title: '用户名',
              dataIndex: 'username',
              render(value, record) {
                return value || '--'
              },
            },
            {
              title: '邮箱',
              dataIndex: 'email',
              render(value, record) {
                return value || '--'
              },
            },
            {
              title: '手机号',
              dataIndex: 'phone',
              render(value, record) {
                return value || '--'
              },
            },
          ]}
        ></Table>
      ) : (
        <Empty
          style={{
            marginTop: 100,
          }}
          description="暂无权限"
        />
      )}
    </div>
  )
}
