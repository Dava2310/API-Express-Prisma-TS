/**
 * Clase base para errores operativos en la aplicación.
 * Extiende de Error e incluye código de estado HTTP y flag para distinguir errores operativos.
 */
export class AppError extends Error {
  /** Código de estado HTTP que representa el error (ej. 404, 400, 500). */
  public readonly statusCode: number;

  /** Indica si el error es operativo (esperado y controlado) o no. */
  public readonly isOperational: boolean;

  /**
   * Crea una instancia de AppError.
   * @param message Mensaje descriptivo del error.
   * @param statusCode Código HTTP que representa el error (por defecto 500).
   * @param isOperational Indica si el error es operativo (por defecto true).
   */
  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Captura el stack trace para que apunte a esta clase
    Error.captureStackTrace(this, this.constructor);
  }
}
