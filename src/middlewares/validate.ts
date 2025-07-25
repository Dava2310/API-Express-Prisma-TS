import { Request, Response, NextFunction } from 'express';
import responds from '@/red/responds';

export const validateAndConvertId = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const rawId = req.params[paramName];

    if (!rawId) {
      return responds.error(req, res, { message: `${paramName} is required` }, 400);
    }

    const idInt = parseInt(rawId, 10);

    if (isNaN(idInt)) {
      return responds.error(req, res, { message: `Invalid ${paramName}` }, 400);
    }

    // ✅ Guardamos el ID convertido en res.locals
    res.locals[paramName] = idInt;

    next();
  };
};
