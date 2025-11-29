import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'generated/prisma/enums';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(role: Role[], userRoles: Role[]): boolean {
    const normalize = (r: any): Role[] => {
      if (!r) return [];
      if (Array.isArray(r)) {
        return r.flat(Infinity).filter((x) => typeof x === 'string') as Role[];
      }
      return [r] as Role[];
    };

    const normalizedUserRoles = normalize(userRoles);
    console.log('Matching roles:', role, normalizedUserRoles);
    return role.some((required) => normalizedUserRoles.includes(required));
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles || roles.length === 0) {
      console.log('No roles required, access granted');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      console.log('No user found in request, authentication required');
      throw new UnauthorizedException('Authentication required');
    }

    if (!this.matchRoles(roles, user.role)) {
      console.log('User does not have required roles, access denied');
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }
    console.log('RoleGuard: Access granted');
    return true;
  }
}