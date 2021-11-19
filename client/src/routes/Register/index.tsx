import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, notification, Upload } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { UploadChangeParam } from 'antd/lib/upload'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { registerTenant, Tenant } from '../../api/tenant'
import { config } from '../../config'
import './styles.less'

export const Register = () => {
  const [logoUrl, setLogoUrl] = useState<string | ArrayBuffer | null>('')
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form] = useForm()
  const navigate = useNavigate()
  const token = new URL(window.location.href).searchParams.get('token')

  if (!token) {
    navigate('/login')
  }

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
      const res = await registerTenant(
        {
          ...values,
          logo: logoUrl as string,
        },
        token as string
      )

      notification.success({
        message: '创建成功',
      })

      window.location.href = `${window.location.protocol}//${res.data.domain}.${config.pageBaseHost}/token-set?token=${token}`
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
        }}
        cancelButtonProps={{}}
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
          layout="vertical"
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
            <Input placeholder="名称"></Input>
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
              placeholder="域名"
              addonBefore={`${window.location.protocol}//`}
              addonAfter={`.${window.location.host}`}
            ></Input>
          </Form.Item>
          <Form.Item name="description" label="企业描述">
            <Input.TextArea placeholder="企业描述" />
          </Form.Item>
          <Button hidden htmlType="submit" type="primary">
            提交
          </Button>
        </Form>
      </Modal>
    </div>
  )
}
