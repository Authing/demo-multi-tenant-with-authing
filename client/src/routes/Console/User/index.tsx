import { User } from '@authing/react-ui-components'
import { Modal, Avatar, Empty, Table, Button, notification } from 'antd'
import { useCallback, useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../context/globalContext'
import { removeMember, fetchUsersOfTenant } from '../../../api/tenant'
import { AddMember } from './AddMember'

const pageSize = 10

export const UserPage = () => {
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [userList, setUserList] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const { user: userInfo, tenant: tenantInfo } = useContext(GlobalContext)

  const fetchUserList = useCallback(async () => {
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
  }, [page, tenantInfo])

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
      <div
        style={{
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <h3
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 0,
          }}
        >
          成员管理
        </h3>
        <Button
          style={{
            marginLeft: 'auto',
          }}
          type="primary"
          onClick={() => {
            setVisible(true)
          }}
        >
          添加成员
        </Button>
      </div>
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
          description="暂无权限查看"
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
