import db from '@/database/mysql';
const TABLE = 'permissions';
import { RowDataPacket } from 'mysql2';

export interface Permission {
  id?: number;
  action: string;
  description?: string;
  category?: string;
}

export const PermissionModel = {
  createRecord: (data: Partial<Permission>) => db.createRecord(TABLE, data),
  updateRecord: (data: Partial<Permission>, conditions = {}) => db.updateRecord(TABLE, data, conditions),
  findRecords: (conditions = {}, limit: number | null = null) => db.findRecords(TABLE, conditions, limit),
  findOneRecord: (conditions = {}) => db.findOneRecord(TABLE, conditions),
  deleteRecord: (conditions = {}) => db.deleteRecord(TABLE, conditions),
  pool: db.pool,
  findByIds: async (ids: number[]) => {
    if (ids.length === 0) return [];
    const placeholders = ids.map(() => '?').join(', ');
    const sql = `SELECT * FROM ${TABLE} WHERE id IN (${placeholders})`;
    const [rows] = await db.pool.execute<RowDataPacket[]>(sql, ids);
    return rows;
  },
};

export default { PermissionModel };
