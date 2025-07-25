import { Response } from 'express';
import { RequestWithUserId } from '@/common/interfaces';
import responds from '@/red/responds';
import { Test } from '@prisma/client';

import testService from './test.service';
import { CreateTestDto, UpdateTestDto } from './dto';

/**
 * Consigue los datos de todos los Tests válidos en la BD.
 */
const getTests = async (req: RequestWithUserId, res: Response) => {
  // Consiguiendo los datos llamando al servicio
  const tests = await testService.getTests();

  // Enviando los datos al cliente
  return responds.success(req, res, { data: tests }, 200);
};

/**
 * Consigue todos los datos de un Test en específico por su ID.
 */
const getTestById = async (req: RequestWithUserId, res: Response) => {
  // Conseguir el ID del Test a buscar en los datos de la Request
  const id: number = res.locals.id;

  // Conseguir el Test llamando al servicio
  const test: Test = await testService.getTestById(id);

  // Mandar respuesta al cliente con los datos encontrados.
  return responds.success(req, res, { data: test }, 200);
};

/**
 * Crea un nuevo registro de la entidad Test en la BD.
 */
const createTest = async (req: RequestWithUserId<CreateTestDto>, res: Response) => {
  // Obtener todos los datos del Test a crear desde el cuerpo de la Request.
  const data = req.body;

  // Llamar al servicio de Test para crear un nuevo registro.
  const newTest: Test = await testService.createTest(data);

  // Devolver respuesta al cliente
  return responds.success(req, res, { data: newTest, message: 'Test creado exitosamente.' }, 201);
};

/**
 * Actualiza los datos de un registro de la entidad Test en la BD.
 */
const updateTest = async (req: RequestWithUserId<UpdateTestDto>, res: Response) => {
  // Obtener los datos que se van a modificar del Test desde el cuerpo de la Request
  const data = req.body;

  // Obtener el ID del Test que se va a modificar
  const id: number = res.locals.id;

  // Llamar al servicio para modificar el Test
  const updatedTest = await testService.updateTest(id, data);

  // Responder con el Test actualizado
  return responds.success(req, res, { data: updatedTest, message: 'Test modificado exitosamente.' }, 200);
};

/**
 * Elimina de forma lógica un registro de la entidad Test en la BD.
 */
const removeTest = async (req: RequestWithUserId, res: Response) => {
  // Obtener el ID del Test que se va a eliminar
  const id: number = res.locals.id;

  // Llamar al servicio para proceder con la eliminación
  await testService.removeTest(id);

  // Responder con un mensaje de éxito al cliente
  return responds.success(req, res, { message: 'Test eliminado exitosamente.' }, 200);
};

export default {
  getTests,
  getTestById,
  createTest,
  updateTest,
  removeTest,
};
