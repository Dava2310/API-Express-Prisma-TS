import db from '@/database/mysql';
const TABLE = 'user_roles';

export interface UserRole {
  userId: number;
  roleId: number;
}

export const UserRoleModel = {
  createRecord: (data: UserRole) => db.createRecord(TABLE, data),
  deleteRecord: (conditions = {}) => db.deleteRecord(TABLE, conditions),
  findRecords: (conditions = {}) => db.findRecords(TABLE, conditions),
  pool: db.pool,
};

export default { UserRoleModel };
