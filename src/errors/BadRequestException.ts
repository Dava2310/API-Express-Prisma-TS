import { AppError } from './AppError';

/**
 * Error que representa una solicitud inválida o malformada.
 * Código HTTP: 400 Bad Request.
 */
export class BadRequestException extends AppError {
  constructor(message: string = 'Solicitud inválida') {
    super(message, 400);
  }
}
