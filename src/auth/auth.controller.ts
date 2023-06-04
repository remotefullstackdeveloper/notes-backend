import { Controller, Post, Body, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SharedService } from 'src/shared/shared.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private jwtService: JwtService,
    private sharedService: SharedService
    ) { }
  
  @Post('signup')
  async signUp(@Body() body: any) {
    // check start with
    const { email, password } = body;
    // email exist
    const checkUserExist = await this.userService.findUserWithEmail(email);
    if (checkUserExist) {
      throw new NotFoundException('User already exist.');
    }

    // decrypt password and save
    const hashedPassword = await this.sharedService.generateHash(password);
    body.password = hashedPassword;
    await this.userService.create(body);
    return {
      statusCode: 201, message: 'Successfully Signup',
    };
  }

  @Post('login')
  async login(@Body() body: any) {
    // check valid user
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Email address or password is not correct.');
    }
    const payload = { id: user.id, email: body.email };
    const token = this.jwtService.sign(payload);

    return { statusCode: 201, auth_token: token, message: 'Successfully Login.' };
  }

}