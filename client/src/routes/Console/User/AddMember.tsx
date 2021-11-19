import { Modal, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { FC, useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../context/globalContext'
import { addMember } from '../../../api/tenant'

export const AddMember: FC<{
  visible: boolean
  onCancel: () => void
  onSuccess: () => void
}> = ({ visible, onCancel, onSuccess }) => {
  const [form] = useForm()
  const [loading, setLoading] = useState(false)
  const { tenant: tenantInfo } = useContext(GlobalContext)

  useEffect(() => {
    if (visible) {
      form.resetFields()
    }
  }, [form, visible])

  return (
    <Modal
      okButtonProps={{
        loading: loading,
      }}
      onCancel={onCancel}
      onOk={() => form.submit()}
      title="添加成员"
      visible={visible}
    >
      <Form
        onFinish={async (values) => {
          setLoading(true)
          try {
            await addMember(tenantInfo!.authingTenantId, {
              username: values.username,
              email: values.email,
              password: values.password,
            })
            onSuccess()
          } catch (e) {
            console.error(e)
          } finally {
            setLoading(false)
          }
        }}
        form={form}
        labelCol={{
          span: 4,
        }}
      >
        <Form.Item rules={[{ required: true }]} name="username" label="用户名">
          <Input type="text" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name="email" label="邮箱">
          <Input type="text" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name="password" label="密码">
          <Input type="password" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="passwordRepeat"
          label="重复密码"
        >
          <Input type="password" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
