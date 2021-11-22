import { Avatar } from 'antd'
import { FC } from 'react'
import { Tenant } from '../../api/tenant'
import { config } from '../../config'

export const TenantCard: FC<{
  tenant: Tenant
  token: string
}> = ({ tenant, token }) => {
  return (
    <div
      onClick={() =>
        (window.location.href = `${window.location.protocol}//${tenant.domain}.${config.pageBaseHost}/token-set?token=${token}`)
      }
      className="tenant-card"
    >
      <Avatar size={64} src={tenant.logo}></Avatar>
      <h5
        style={{
          marginBottom: 0,
          fontSize: 20,
          fontWeight: 500,
          marginLeft: 24,
        }}
      >
        {tenant.name}
      </h5>
    </div>
  )
}
