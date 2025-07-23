import prisma from '../../database/prisma';
import { Test } from '@prisma/client';
import { CreateTestDto, UpdateTestDto } from './dto';

/**
 * Obtiene todos los datos de los Test válidos o no eliminados lógicamente en la BD.
 * @returns Una promesa que resuelve con un array de Tests.
 */
const getAll = async (): Promise<Test[]> => {
  return await prisma.test.findMany({
    where: {
      isDeleted: false,
    },
  });
};

/**
 * Obtiene un Test por su ID, que sea válido o no eliminado lógicamente en la BD.
 * @param id ID del Test a buscar.
 * @returns Una promesa que resuelve con los datos del Test.
 */
const getById = async (id: number): Promise<Test | null> => {
  return await prisma.test.findFirst({
    where: {
      AND: [{ id }, { isDeleted: false }],
    },
  });
};

/**
 * Crea un Test.
 * @param data Los datos necesarios para crear un nuevo Test.
 * @returns Una promesa que resuelve con los datos del Test creado.
 */
const create = async (data: CreateTestDto): Promise<Test> => {
  return await prisma.test.create({
    data,
  });
};

/**
 * Modifica los datos de un Test.
 * @param id ID del Test a modificar.
 * @param data Los datos para actualizar el Test.
 * @returns Una promesa que resuelve con los datos del Test modificado.
 */
const update = async (id: number, data: UpdateTestDto): Promise<Test> => {
  return await prisma.test.update({
    where: {
      id,
    },
    data,
  });
};

/**
 * Elimina un Test de la base de datos de forma física.
 * Este método debe ser usado con preucación, ya que elimina un Test de forma permanente.
 * @param id Id del Test a eliminar.
 * @returns Una promesa que resuelve con los datos del Test eliminado.
 */
const permanentRemove = async (id: number): Promise<Test> => {
  return await prisma.test.delete({
    where: {
      id,
    },
  });
};

/**
 * Elimina un Test de forma lógica en la BD, encontrado por su ID.
 * Este método debe ser el principal a ser usado. Elimina lógicamente el registro modificando el
 * valor del atributo isDeleted a True.
 * @param id
 * @returns
 */
const remove = async (id: number): Promise<Test> => {
  return await prisma.test.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });
};

export default {
  getAll,
  getById,
  create,
  update,
  permanentRemove,
  remove,
};
