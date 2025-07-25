import db from '@/database/mysql';
const TABLE = 'user_permissions';

export interface UserPermission {
  userId: number;
  permissionId: number;
}

export const UserPermissionModel = {
  createRecord: (data: UserPermission) => db.createRecord(TABLE, data),
  deleteRecord: (conditions = {}) => db.deleteRecord(TABLE, conditions),
  findRecords: (conditions = {}) => db.findRecords(TABLE, conditions),
  pool: db.pool,
};

export default { UserPermissionModel };
