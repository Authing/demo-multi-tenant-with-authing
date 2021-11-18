import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, notification, Upload } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { UploadChangeParam } from 'antd/lib/upload'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { registerTenant, Tenant } from '../../api/tenant'
import './styles.scss'

export const Register = () => {
  const [logoUrl, setLogoUrl] = useState<string | ArrayBuffer | null>('')
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form] = useForm()
  const navigate = useNavigate()
  const userInfo = JSON.parse(
    new URL(window.location.href).searchParams.get('user_info') || 'null'
  )

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setUploading(false)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setLogoUrl(info.file.response.data?.url)
    }
  }

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  )

  const onFinish = async (values: Tenant) => {
    if (!logoUrl) {
      notification.error({
        message: '请上传企业 Logo',
      })
      return
    }

    setSubmitting(true)

    try {
      const res = await registerTenant({
        ...values,
        logo: logoUrl as string,
        adminId: userInfo!.id,
      })

      notification.success({
        message: '创建成功',
      })

      navigate(
        `/console/dashboard?user_info=${JSON.stringify(
          userInfo
        )}&tenant_info=${JSON.stringify(res.data)}`
      )
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="register-page">
      <Modal
        title="注册企业"
        centered
        okButtonProps={{
          loading: submitting,
          size: 'large',
        }}
        cancelButtonProps={{
          size: 'large',
        }}
        onOk={() => form.submit()}
        onCancel={() => navigate(-1)}
        visible
        mask={false}
        closable={false}
        width={600}
      >
        <Form
          labelCol={{
            span: 6,
          }}
          onFinish={onFinish}
          className="register-form"
          form={form}
        >
          <Form.Item required label="企业 Logo">
            <Upload
              name="file"
              listType="picture-card"
              showUploadList={false}
              action={`https://core.authing.cn/api/v2/upload?folder=demo-photos`}
              onChange={handleChange}
              beforeUpload={() => {
                setUploading(true)
                return true
              }}
              accept=".jpg,.jpeg,.png,.svg"
            >
              {logoUrl ? (
                <img
                  src={logoUrl as string}
                  alt="Logo"
                  style={{ width: '100%' }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="name"
            label="企业名称"
          >
            <Input size="large" placeholder="名称"></Input>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="domain"
            label="企业域名"
          >
            <Input
              size="large"
              placeholder="域名"
              addonBefore={`${window.location.protocol}//`}
              addonAfter={`${window.location.host}`}
            ></Input>
          </Form.Item>
          <Form.Item name="description" label="企业描述">
            <Input.TextArea placeholder="企业描述" />
          </Form.Item>
          <Button hidden htmlType="submit" size="large" type="primary">
            提交
          </Button>
        </Form>
      </Modal>
    </div>
  )
}
