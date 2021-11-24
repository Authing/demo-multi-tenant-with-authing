const { DataTypes } = require('sequelize')
const { sequelize } = require('./getConnection')

//  存储租户(企业)信息
const Tenant = sequelize.define('Tenant', {
  authingTenantId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '绑定的 Authing 租户 ID',
  },
  // 正常业务应该可以存多个
  adminId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '管理用户 ID',
  },
  domain: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    comment: '租户域名',
  },
})

Tenant.sync({ alter: true })

class TenantService {
  constructor() {}

  async insert(tenantInfo) {
    return await Tenant.create(tenantInfo)
  }
  async findById(id) {
    return await Tenant.findOne({
      where: {
        id,
      },
    })
  }
  async findByDomain(domain) {
    return await Tenant.findOne({
      where: {
        domain,
      },
    })
  }
  async findByAuthingIds(ids) {
    return await Tenant.findAll({
      where: {
        authingTenantId: ids,
      },
    })
  }
}

module.exports = {
  Tenant,
  tenantService: new TenantService(),
}
