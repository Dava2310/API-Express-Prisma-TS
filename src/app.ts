import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { configuration } from './config';
import routes from './routes';
import { errorHandler } from './middlewares';

dotenv.config();

// Declaración de la APP en Express
const app = express();

app.use(cors());
app.use(express.json());

// Ruta de Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ message: 'Hello' });
});

app.use('/api', routes); // Todas las rutas bajo el prefijo /api

// Establecer el puerto en donde inicia la API
app.set('port', configuration.app.port);

// Configurar el manejo de errores
app.use(errorHandler);

export default app;
