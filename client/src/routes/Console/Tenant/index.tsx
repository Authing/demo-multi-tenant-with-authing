import { Avatar, Form, Input } from 'antd'
import { useContext } from 'react'
import { GlobalContext } from '../../../context/globalContext'
import { config } from '../../../config'
import './styles.less'

export const Tenant = () => {
  const { tenant: tenantInfo } = useContext(GlobalContext)

  return tenantInfo ? (
    <div className="tenant-info-page">
      <h3
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        企业信息
      </h3>

      <Form
        labelCol={{ span: 4 }}
        labelAlign="left"
        style={{
          width: '800px',
        }}
      >
        <Form.Item label="企业 logo">
          <Avatar
            style={{
              borderRadius: 8,
            }}
            size={120}
            src={tenantInfo.logo}
            shape="square"
          />
        </Form.Item>
        <Form.Item label="企业名称">
          <Input size="large" disabled value={tenantInfo.name} />
        </Form.Item>
        <Form.Item label="企业地址">
          <Input
            size="large"
            disabled
            value={`${window.location.protocol}//${tenantInfo!.domain}.${
              config.pageBaseHost
            }`}
          />
        </Form.Item>
      </Form>
      {/* <Descriptions bordered title="企业信息" layout="vertical">
        <Descriptions.Item label="企业 Logo">
          <Avatar src={tenantInfo?.logo}></Avatar>
        </Descriptions.Item>
        <Descriptions.Item label="企业名称">
          {tenantInfo?.name}
        </Descriptions.Item>
        <Descriptions.Item label="企业描述">
          {tenantInfo?.description || '--'}
        </Descriptions.Item>
        <Descriptions.Item label="企业地址">
          {`${window.location.protocol}//${tenantInfo!.domain}.${
            config.pageBaseHost
          }`}
        </Descriptions.Item>
      </Descriptions> */}
    </div>
  ) : (
    <></>
  )
}
