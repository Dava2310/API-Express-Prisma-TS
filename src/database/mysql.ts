/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPool, Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { configuration } from '../config';

const pool: Pool = createPool({
  host: configuration.mysql.host, // solo el hostname
  user: configuration.mysql.user, // admin
  password: configuration.mysql.password,
  database: configuration.mysql.database,
  port: Number(configuration.mysql.port) || 3306, // puerto como número
});

/**
 * Tipo genérico para representar un objeto con claves string y valores de cualquier tipo.
 */
type DataObject = Record<string, any>;

/**
 * Resultado típico de una operación de inserción o actualización en MySQL.
 */
type QueryResult = ResultSetHeader;

/**
 * Inserta un nuevo registro en la tabla especificada.
 *
 * @param table Nombre de la tabla donde insertar.
 * @param data Objeto con columnas y valores a insertar.
 * @returns Resultado de la operación con ID insertado y demás info.
 * @throws Error si la operación falla.
 */
const createRecord = async (table: string, data: DataObject): Promise<QueryResult> => {
  const placeholders = Object.keys(data)
    .map(() => '?')
    .join(', ');
  const columns = Object.keys(data).join(', ');
  const values = Object.values(data);

  const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

  try {
    const [result] = await pool.execute<QueryResult>(sql, values);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Actualiza un registro existente en la tabla especificada.
 *
 * @param table Nombre de la tabla.
 * @param data Columnas y valores a actualizar.
 * @param conditions Condiciones para el WHERE.
 * @returns Resultado de la operación.
 * @throws Error si falla la actualización.
 */
const updateRecord = async (table: string, data: DataObject, conditions: DataObject = {}): Promise<QueryResult> => {
  const setClause = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(', ');
  const setValues = Object.values(data);

  const whereClause = Object.keys(conditions)
    .map((key) => `${key} = ?`)
    .join(' AND ');
  const whereValues = Object.values(conditions);

  const values = [...setValues, ...whereValues];

  const sql = `UPDATE ${table} SET ${setClause}${whereClause ? ` WHERE ${whereClause}` : ''}`;

  try {
    const [result] = await pool.execute<QueryResult>(sql, values);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Recupera registros de la tabla con condiciones opcionales y límite.
 *
 * @param table Nombre de la tabla.
 * @param conditions Condiciones WHERE opcionales.
 * @param limit Número máximo de registros a traer.
 * @returns Arreglo de registros.
 * @throws Error si falla la consulta.
 */
const findRecords = async (
  table: string,
  conditions: DataObject = {},
  limit: number | null = null,
): Promise<RowDataPacket[]> => {
  const whereClause = Object.keys(conditions)
    .map((key) => `${key} = ?`)
    .join(' AND ');
  const values = Object.values(conditions);

  let sql = `SELECT * FROM ${table}`;
  if (whereClause) sql += ` WHERE ${whereClause}`;
  if (limit) sql += ` LIMIT ${limit}`;

  try {
    const [rows] = await pool.execute<RowDataPacket[]>(sql, values);
    return rows;
  } catch (error) {
    throw error;
  }
};

/**
 * Recupera un solo registro de la tabla con condiciones opcionales.
 *
 * @param table Nombre de la tabla.
 * @param conditions Condiciones WHERE.
 * @returns Un registro o null si no hay coincidencias.
 * @throws Error si falla la consulta.
 */
const findOneRecord = async (table: string, conditions: DataObject = {}): Promise<RowDataPacket | null> => {
  const results = await findRecords(table, conditions, 1);
  return results[0] || null;
};

/**
 * Elimina registros de la tabla basados en condiciones.
 *
 * @param table Nombre de la tabla.
 * @param conditions Condiciones WHERE.
 * @returns Resultado de la operación de eliminación.
 * @throws Error si falla la eliminación.
 */
const deleteRecord = async (table: string, conditions: DataObject = {}): Promise<QueryResult> => {
  const whereClause = Object.keys(conditions)
    .map((key) => `${key} = ?`)
    .join(' AND ');
  const values = Object.values(conditions);

  let sql = `DELETE FROM ${table}`;
  if (whereClause) {
    sql += ` WHERE ${whereClause}`;
  }

  try {
    const [result] = await pool.execute<QueryResult>(sql, values);
    return result;
  } catch (error) {
    throw error;
  }
};

export default { pool, createRecord, updateRecord, findRecords, findOneRecord, deleteRecord };
