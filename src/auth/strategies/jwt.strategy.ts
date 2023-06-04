import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthenticatedUserPayload } from '../auth.types';
import {UsersService  } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hard!to-guess_secret',
    });
  }

  async validate(payload: IAuthenticatedUserPayload) {
    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}