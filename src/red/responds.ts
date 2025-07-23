import { Request, Response } from 'express';

/**
 * Envía una respuesta HTTP exitosa al cliente.
 *
 * @param req - Objeto de solicitud HTTP.
 * @param res - Objeto de respuesta HTTP.
 * @param message - Mensaje de respuesta, puede ser un objeto o una cadena.
 * @param status - Código de estado HTTP (por defecto es 200).
 *
 * @example
 * success(req, res, { message: 'Operación exitosa' }, 201);
 */
const success = (req: Request, res: Response, message: object | string, status = 200) => {
  res.status(status).send({
    error: false,
    status: status,
    body: message,
  });
};

/**
 * Envía una respuesta HTTP de error al cliente.
 *
 * @param req - Objeto de solicitud HTTP.
 * @param res - Objeto de respuesta HTTP.
 * @param message - Mensaje de error, puede ser un objeto o una cadena.
 * @param status - Código de estado HTTP (por defecto es 500).
 *
 * @example
 * error(req, res, 'Error al procesar la solicitud', 400);
 */
const error = (req: Request, res: Response, message: object | string, status: number = 500) => {
  res.status(status).send({
    error: true,
    status: status,
    body: message,
  });
};

export default { success, error };
