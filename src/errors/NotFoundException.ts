import { AppError } from './AppError';

/**
 * Error que indica que el recurso solicitado no fue encontrado.
 * Código HTTP: 404 Not Found.
 */
export class NotFoundException extends AppError {
  constructor(message: string = 'Recurso no encontrado') {
    super(message, 404);
  }
}
