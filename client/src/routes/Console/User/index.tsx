import { User } from '@authing/react-ui-components'
import { Modal, Avatar, Empty, Table, Button, notification } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { removeMember, fetchUsersOfTenant } from '../../../api/tenant'
import { getTenantInfo } from '../../../utils/tenant'
import { getUserInfo } from '../../../utils/user'
import { AddMember } from './AddMember'

const pageSize = 10

export const UserPage = () => {
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [userList, setUserList] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const tenantInfo = getTenantInfo()
  const userInfo = getUserInfo()

  const fetchUserList = useCallback(async () => {
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

  useEffect(() => {
    fetchUserList()
  }, [fetchUserList])

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 8,
        padding: '56px 47px',
        height: '100%',
      }}
    >
      <Button
        style={{
          marginBottom: 24,
          float: 'right',
        }}
        type="primary"
        onClick={() => {
          setVisible(true)
        }}
      >
        添加成员
      </Button>
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
            {
              title: '操作',
              dataIndex: 'id',
              render(value) {
                return (
                  <Button
                    // 不能删除自己或管理员账号
                    disabled={[tenantInfo?.adminId, userInfo?.id].includes(
                      value
                    )}
                    danger
                    onClick={() => {
                      Modal.confirm({
                        title: '确认移除该成员？',
                        onOk: async () => {
                          await removeMember(
                            tenantInfo?.authingTenantId!,
                            value
                          )
                          notification.success({
                            message: '移除成功',
                          })
                          fetchUserList()
                        },
                      })
                    }}
                  >
                    移除
                  </Button>
                )
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

      <AddMember
        visible={visible}
        onCancel={() => setVisible(false)}
        onSuccess={() => {
          setVisible(false)
          fetchUserList()
        }}
      />
    </div>
  )
}
