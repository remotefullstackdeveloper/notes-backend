import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/users.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { SharedModule } from './shared/shared.module';
import { Note } from './notes/entity/notes.entity';
import { NotesModule } from './notes/notes.module';
dotenv.config();

const ENV = process.env;
console.log(ENV)
@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      host: ENV.DB_HOST,
      password: ENV.DB_PASSWORD,
      database: ENV.DB_NAME,
      entities: [User, Note],
      synchronize: true,
      type: 'postgres',
      port: +ENV.DB_PORT,
      username: ENV.DB_USERNAME,
    }),

    AuthModule, 
    UsersModule,
    SharedModule,
    NotesModule
  ],
  providers: [AppService],

})
export class AppModule { }
