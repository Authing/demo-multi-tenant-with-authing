import { Input, Form, Button, Spin, notification } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { FC, useEffect, useState } from 'react'
import {
  createTenantConnection,
  fetchTenantConnection,
  updateTenantConnection,
} from '../../../api/tenant'

export const GitlabConnection: FC<{
  tenantId: string
}> = ({ tenantId }) => {
  const [connInfo, setConnInfo] = useState<any>()
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = useForm()

  useEffect(() => {
    setLoading(true)
    fetchTenantConnection(tenantId)
      .then((res) => {
        setConnInfo(res.data)

        if (res.data) {
          form.setFieldsValue({
            identifier: res.data.identifier,
            displayName: res.data.displayName,
            clientID: res.data.fields.clientID,
            clientSecret: res.data.fields.clientSecret,
            baseURL: res.data.fields.baseURL,
          })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [form, tenantId])

  const onFinish = async (values: any) => {
    setSubmitting(true)
    try {
      if (connInfo) {
        await updateTenantConnection(connInfo.id, values)
        notification.success({
          message: '更新成功',
        })
      } else {
        await createTenantConnection(tenantId, values)
        notification.success({
          message: '创建成功',
        })
      }
    } catch (e) {
      console.error(e, '>>>>>>>')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      style={{
        width: '800px',
      }}
    >
      <h3
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        Gitlab 登录
      </h3>

      <Spin spinning={loading}>
        <Form
          form={form}
          initialValues={{
            type: 'gitlab',
            connectionType: 'gitlab',
            name: 'Gitlab',
          }}
          layout="vertical"
          size="large"
          onFinish={onFinish}
        >
          <Form.Item
            name="identifier"
            rules={[
              {
                required: true,
              },
            ]}
            label="唯一标识"
          >
            <Input disabled={Boolean(connInfo)} placeholder="请输入唯一标识" />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="displayName"
            label="显示名称"
          >
            <Input placeholder="请输入显示名称" />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="baseURL"
            label="Base URL"
          >
            <Input placeholder="https://gitlab.com" />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="clientID"
            label="Client ID"
          >
            <Input placeholder="Client ID" />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="clientSecret"
            label="Client Secret"
          >
            <Input placeholder="Client ID" />
          </Form.Item>

          <Form.Item hidden name="type" label="类型">
            <Input placeholder="类型" />
          </Form.Item>
          <Form.Item hidden name="connectionType" label="类型">
            <Input placeholder="连接类型" />
          </Form.Item>

          <Form.Item hidden name="name" label="类型">
            <Input placeholder="身份源名" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={submitting}>
            确定
          </Button>
        </Form>
      </Spin>
    </div>
  )
}
