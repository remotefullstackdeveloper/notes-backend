
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {

    const user = await this.usersService.verifyUser(email,pass);
    if(user) return user;
    return null;
  }

  async login(user: any) {
    const payload = {id:user.id,email:user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }
}