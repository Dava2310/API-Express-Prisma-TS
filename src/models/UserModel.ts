/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '@/database/mysql';

const pool = db.pool;
const TABLE = 'usuarios';

// Define el tipo de datos que representa un usuario
export interface User {
  id?: number;
  nombre: string;
  apellido: string;
  password: string;
  email: string;
  numeroTelefono: string;
  chatId: string;
  // agrega aquí otros campos que tengas en la tabla
}

export const UserModel = {
  createRecord: (data: Partial<User>) => db.createRecord(TABLE, data),
  updateRecord: (data: Partial<User>, conditions: Record<string, any> = {}) => db.updateRecord(TABLE, data, conditions),
  findRecords: (conditions: Record<string, any> = {}, limit: number | null = null) =>
    db.findRecords(TABLE, conditions, limit),
  findOneRecord: (conditions: Record<string, any> = {}) => db.findOneRecord(TABLE, conditions),
  deleteRecord: (conditions: Record<string, any> = {}) => db.deleteRecord(TABLE, conditions),
  pool,
};

export default { UserModel };
