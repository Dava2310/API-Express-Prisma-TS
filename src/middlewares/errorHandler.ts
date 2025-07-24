/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import responds from '../red/responds';

/**
 * Middleware global para el manejo centralizado de errores.
 * Captura instancias de AppError y errores genéricos.
 * Envía respuestas estandarizadas al cliente.
 *
 * @param err - Error lanzado durante la ejecución de una ruta.
 * @param req - Objeto Request de Express.
 * @param res - Objeto Response de Express.
 * @param _next - Función next de Express (no usada).
 */
export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return responds.error(req, res, { message: err.message }, err.statusCode);
  }

  if (err instanceof Error) {
    console.error(err.stack);
    return responds.error(req, res, { message: err.message }, 500);
  }

  console.error('Unknown error:', err);
  return responds.error(req, res, { message: 'Error interno del servidor.' }, 500);
};
