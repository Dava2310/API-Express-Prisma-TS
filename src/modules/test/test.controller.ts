import { RequestWithUserId } from '../../common/interfaces/request-with-user-id.interface';
import { Response } from 'express';
import responds from '../../red/responds';
import testService from './test.service';
import { CreateTestDto, UpdateTestDto } from './dto';
import { Test } from '@prisma/client';

/**
 * Consigue los datos de todos los Tests válidos en la BD.
 */
const getTests = async (req: RequestWithUserId, res: Response) => {
  try {
    // Llamar al servicio de tests
    const tests = await testService.getTests();

    // Responder con los tests obtenidos
    return responds.success(req, res, { data: tests }, 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al obtener los tests';
    return responds.error(req, res, { message }, 500);
  }
};

/**
 * Consigue todos los datos de un Test en específico por su ID.
 */
const getTestById = async (req: RequestWithUserId, res: Response) => {
  try {
    // Conseguir el ID del Test a buscar en los datos de la Request.
    const id: number = res.locals.id;

    // Conseguir el Test llamando el servicio.
    const test: Test = await testService.getTestById(id);

    // Mandar respuesta al cliente con los datos encontrados.
    return responds.success(req, res, { data: test }, 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al obtener los tests';
    return responds.error(req, res, { message }, 500);
  }
};

/**
 * Crea un nuevo registro de la entidad Test en la BD.
 */
const createTest = async (req: RequestWithUserId<CreateTestDto>, res: Response) => {
  try {
    // Obtener todos los datos del Test a crear desde el cuerpo de la Request.
    const data = req.body;

    // Llamar al servicio de Test para crear un nuevo registro.
    const newTest: Test = await testService.createTest(data);

    // Devolver respuesta al cliente
    return responds.success(req, res, { data: newTest, message: 'Test creado exitosamente.' }, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al crear el test';
    return responds.error(req, res, { message }, 500);
  }
};

/**
 * Actualiza los datos de un registro de la entidad Test en la BD.
 */
const updateTest = async (req: RequestWithUserId<UpdateTestDto>, res: Response) => {
  try {
    // Obtener los datos que se van a modificar del Test desde el cuerpo de la Request
    const data = req.body;

    // Obtener el ID del Test que se va a modificar
    const id: number = res.locals.id;

    // Llamar al servicio para modificar el Test
    const updatedTest = await testService.updateTest(id, data);

    // Responder con el Test actualizado
    return responds.success(req, res, { data: updatedTest, message: 'Test modificado exitosamente.' }, 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al modificar el test';
    return responds.error(req, res, { message }, 500);
  }
};

/**
 * Elimina de forma lógica un registro de la entidad Test en la BD.
 */
const removeTest = async (req: RequestWithUserId, res: Response) => {
  try {
    // Obtener el ID del Test que se va a eliminar
    const id: number = res.locals.id;

    // Llamar al servicio para proceder con la eliminación
    await testService.removeTest(id);

    // Responder con un mensaje de éxito al cliente
    return responds.success(req, res, { message: 'Test eliminado exitosamente.' }, 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al eliminar el test';
    return responds.error(req, res, { message }, 500);
  }
};

export default {
  getTests,
  getTestById,
  createTest,
  updateTest,
  removeTest,
};
