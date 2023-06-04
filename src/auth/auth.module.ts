import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [UsersModule, PassportModule,JwtModule.register({
    secret:"hard!to-guess_secret",
    signOptions:{expiresIn:'24 days'}
  }),
  SharedModule
],

  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports:[AuthService],
  controllers:[AuthController]

})
export class AuthModule {}
