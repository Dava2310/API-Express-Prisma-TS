import Router from 'express';
import testController from './test.controller';

// Middlewares
import { validateRequest, validateAndConvertId } from '../../middlewares';

// Schemas
import { createTestSchema, updateTestSchema } from './dto';

// Inicialización del router.
const router = Router();

// Conseguir todos los Tests
router.get('/', testController.getTests);

// Conseguir un Test por su ID.
router.get('/:id', validateAndConvertId('id'), testController.getTestById);

// Crear un nuevo Test.
router.post('/', validateRequest(createTestSchema), testController.createTest);

// Modificar un Test ya creado.
router.patch('/:id', validateAndConvertId('id'), validateRequest(updateTestSchema), testController.updateTest);

// Eliminar de forma lógica un Test.
router.delete('/:id', validateAndConvertId('id'), testController.removeTest);

export default router;
