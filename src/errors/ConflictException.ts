import { AppError } from './AppError';

/**
 * Error que representa cuando un registro representa conflictos de duplicados.
 * Código HTTP: 409 Conflict.
 */
export class ConflictException extends AppError {
  constructor(message: string = 'Conflicto en la solicitud') {
    super(message, 409);
  }
}
