import { Avatar, Descriptions } from 'antd'
import { config } from '../../../config'
import { getTenantInfo } from '../../../utils/tenant'

export const Tenant = () => {
  const tenantInfo = getTenantInfo()

  return (
    tenantInfo && (
      <div
        style={{
          background: '#fff',
          borderRadius: 8,
          padding: '56px 47px',
          height: '100%',
        }}
      >
        <Descriptions bordered title="企业信息" layout="vertical">
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
        </Descriptions>
      </div>
    )
  )
}
