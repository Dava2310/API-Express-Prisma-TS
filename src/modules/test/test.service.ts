import { Test } from '@prisma/client';
import { NotFoundException } from '@/errors';
import testModel from './test.model';
import { CreateTestDto, UpdateTestDto } from './dto';

/**
 * Verifica la existencia de un registro de Test en la BD por su ID.
 * Devuelve los datos del Test encontrado, o lanza una excepción si no lo encuentra.
 * @param id ID del Test a buscar.
 * @returns Una promesa que resuelve con los datos del Test encontrado.
 * @throws Un error si el Test con el ID especificado no fue encontrado.
 */
const findValid = async (id: number): Promise<Test> => {
  const test = await testModel.getById(id);

  if (!test) {
    throw new NotFoundException(`El Test con ID: ${id} no fue encontrado.`);
  }

  return test;
};

/**
 * Obtiene todos los datos de los Tests de la BD.
 * @returns Una promesa que resuelve con un arreglo de todos los Tests.
 */
const getTests = async (): Promise<Test[]> => {
  // Consiguiendo los datos del modelo
  return await testModel.getAll();
};

/**
 * Obtiene todos los datos de un Test buscado por su ID.
 * @param id ID del Test a buscar en la BD.
 * @returns Una promesa que resuelve con el Test encontrado.
 * @throws AppError si el Test no fue encontrado.
 */
const getTestById = async (id: number): Promise<Test> => {
  return await findValid(id);
};

/**
 * Crea un nuevo Test en la BD.
 * @param data Datos del nuevo Test a crear.
 * @returns Una promesa que resuelve con el nuevo Test creado.
 */
const createTest = async (data: CreateTestDto): Promise<Test> => {
  // Aqui se pueden hacer validaciones de duplicados u otras operaciones
  // que corresponden a la lógica de negocio

  // Llamar al modelo para crear el test
  return await testModel.create(data);
};

/**
 * Modifica un Test ya creado en la BD, que se ubica por su ID.
 * @param id ID del Test que se va a modificar.
 * @param data Los nuevos datos del Test para guardar los cambios.
 * @returns Una promesa que resuelve con los datos del Test modificado.
 * @throws AppError si el Test no se encuentra con ese ID en la BD.
 */
const updateTest = async (id: number, data: UpdateTestDto): Promise<Test> => {
  // Primero verificamos la existencia del Test
  await findValid(id);

  // Llamamos al modelo para hacer la modificación
  return await testModel.update(id, data);
};

/**
 * Elimina un Test de forma lógica en la BD identificado por su ID.
 * @param id ID del Test que se va a eliminar de forma lógica.
 * @returns Una promesa que resuelve con los datos del Test "eliminado" lógicamente.
 */
const removeTest = async (id: number): Promise<Test> => {
  // Primero verificamos la existencia del Test
  await findValid(id);

  // Llamamos al modelo para hacer la eliminación
  return await testModel.remove(id);
};

export default {
  getTests,
  getTestById,
  createTest,
  updateTest,
  removeTest,
};
