import db from '@/database/mysql';
const TABLE = 'roles';

export interface Role {
  id?: number;
  name: string;
  description?: string;
}

export const RoleModel = {
  createRecord: (data: Partial<Role>) => db.createRecord(TABLE, data),
  updateRecord: (data: Partial<Role>, conditions = {}) => db.updateRecord(TABLE, data, conditions),
  findRecords: (conditions = {}, limit: number | null = null) => db.findRecords(TABLE, conditions, limit),
  findOneRecord: (conditions = {}) => db.findOneRecord(TABLE, conditions),
  deleteRecord: (conditions = {}) => db.deleteRecord(TABLE, conditions),
  pool: db.pool,
};
