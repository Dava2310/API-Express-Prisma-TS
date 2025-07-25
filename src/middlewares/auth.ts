import jwt from 'jsonwebtoken';
import { configuration } from '@/config';
import responds from '@/red/responds';
import { NextFunction, Response } from 'express';
import { JWTPayload, RequestWithUserId } from '@/common/interfaces';

// Modelos
import { UserPermissionModel } from '@/models/UserPermissionModel';
import { UserRoleModel } from '@/models/UserRoleModel';
import { RolePermissionModel } from '@/models/RolePermissionModel';
import { PermissionModel } from '@/models/PermissionModel';

export const ensureAuthenticated = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
  try {
    // Se obtiene el token de autorización de las cabeceras de la consulta
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return responds.error(req, res, { message: 'Token de acceso no encontrado.' }, 401);
    }

    // Separando el valor del token de la palabra Bearer
    const token = accessToken.startsWith('Bearer ') ? accessToken.split(' ')[1] : accessToken;

    // Ahora se decodifica el token de acceso
    const decoded = jwt.verify(token, configuration.jwt.secret) as JWTPayload;

    req.accessToken = {
      value: token,
      exp: decoded.exp,
    };

    req.user = {
      id: decoded.userId,
    };

    // Verificando si el token de acceso se encuentra en lista negra
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return responds.error(req, res, { message: 'Token expirado', code: 'AccessTokenExpired' }, 401);
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return responds.error(req, res, { message: 'Token inválido', code: 'AccessTokenInvalid' }, 401);
    }

    return responds.error(req, res, { message: (err as Error).message }, 500);
  }
};

/**
 * Middleware to ensure authorization by permissions.
 *
 * This middleware checks if the user has the required permissions to access a resource.
 * Permissions can come directly from the user or from their assigned roles.
 *
 * @param requiredPermissions - Array of permissions required to access the resource.
 * @returns Middleware function.
 */
export const authorizePermission = (requiredPermissions: string[] = []) => {
  return async (req: RequestWithUserId, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return responds.error(req, res, { message: 'Usuario no autenticado.' }, 401);
      }

      const userPermissions = new Set<string>();

      // 1. Obtener permisos directos del usuario
      const directPerms = await UserPermissionModel.findRecords({ userId });
      const directPermIds = directPerms.map((p) => p.permissionId);

      // 2. Obtener roles del usuario
      const userRoles = await UserRoleModel.findRecords({ userId });
      const roleIds = userRoles.map((r) => r.roleId);

      // 3. Obtener todos los role_permissions para cada rol (usando Promise.all para paralelismo)
      const rolePermissionsNested = await Promise.all(
        roleIds.map((roleId) => RolePermissionModel.findRecords({ roleId })),
      );
      const rolePermIds = rolePermissionsNested.flat().map((rp) => rp.permissionId);

      // 4. Obtener todos los permisos (directos + por rol)
      const allPermissionIds = [...new Set([...directPermIds, ...rolePermIds])]; // IDs únicos
      const permissionRows = await PermissionModel.findByIds(allPermissionIds);

      for (const perm of permissionRows) {
        if (perm?.action) userPermissions.add(perm.action);
      }

      // 5. Verificar permisos
      const hasPermission = requiredPermissions.some((perm) => userPermissions.has(perm));
      if (!hasPermission) {
        return responds.error(
          req,
          res,
          {
            message: 'No tienes los permisos necesarios para realizar esta acción.',
          },
          403,
        );
      }

      next();
    } catch (err) {
      return responds.error(req, res, { message: (err as Error).message }, 500);
    }
  };
};
