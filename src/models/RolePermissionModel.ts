import db from '@/database/mysql';
const TABLE = 'role_permissions';

export interface RolePermission {
  roleId: number;
  permissionId: number;
}

export const RolePermissionModel = {
  createRecord: (data: RolePermission) => db.createRecord(TABLE, data),
  deleteRecord: (conditions = {}) => db.deleteRecord(TABLE, conditions),
  findRecords: (conditions = {}) => db.findRecords(TABLE, conditions),
  pool: db.pool,
};

export default { RolePermissionModel };
