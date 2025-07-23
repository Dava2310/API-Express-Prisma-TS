import { Router } from 'express';

// Importando las rutas de los módulos correspondientes
import testRoutes from '../modules/test/test.routes';

// Inicializando las rutas de la apliacación.
const router = Router();

router.use('/tests', testRoutes);

export default router;
