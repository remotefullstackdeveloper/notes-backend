import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise <boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    let auth = request.headers.authorization;
    if (auth.startsWith('Bearer ')) {
      auth = auth.slice(7, auth.length);
    }
    const tokenObj = this.jwtService.verify(auth);
    const user: any = await this.userService.findOne(tokenObj.id);
    return requireRoles.some((role) => user?.role?.includes(role));
  }
}