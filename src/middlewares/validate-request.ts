/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodTypeAny, ZodError, ZodObject, ZodRawShape } from 'zod';
import { Request, Response, NextFunction } from 'express';
import responds from '@/red/responds';

export const validateRequest = <T extends ZodTypeAny>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // 1) Formateo estándar por campo
      const formatted = (result.error as ZodError).format();
      const formattedErrors: Record<string, string> = {};

      Object.entries(formatted).forEach(([key, val]) => {
        if (key === '_errors') return;
        const errs: string[] = (val as any)._errors || [];
        if (errs.length) {
          formattedErrors[key] = errs[0];
        }
      });

      // 2) Si tras el formateo no hay NINGÚN error, puede ser body = {}
      //    y queremos generar “campo obligatorio” por cada propiedad del schema
      if (Object.keys(formattedErrors).length === 0 && schema instanceof ZodObject) {
        const shape: ZodRawShape = (schema as ZodObject<ZodRawShape>)._def.shape();
        Object.entries(shape).forEach(([key, fieldSchema]) => {
          // Solo campos realmente obligatorios (no optional ni default)
          const typeName = (fieldSchema as any)._def.typeName;
          if (typeName === 'ZodOptional' || typeName === 'ZodDefault') return;
          formattedErrors[key] = `El campo '${key}' es obligatorio`;
        });
      }

      return responds.error(
        req,
        res,
        {
          message: 'Datos inválidos',
          errores: formattedErrors,
        },
        400,
      );
    }

    req.body = result.data;
    next();
  };
};
