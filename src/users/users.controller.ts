// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   ParseIntPipe,

//   UseGuards,
//   Request,
//   Headers
// } from '@nestjs/common';
import { CreateUserDto, SampleDto } from './dto/create-user.dto';
// import { User } from './entity/users.entity';
// import { UsersService } from './users.service';

// import {
//   UploadedFile,
//   UseInterceptors,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { Express } from 'express';
// import { ApiBearerAuth, ApiExcludeEndpoint, ApiExtraModels } from '@nestjs/swagger';
// import { FilesInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path'
// import { Authorization } from './dto/auth.dto';
// // import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// // @ApiBearerAuth()
// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) { }
//   // @ApiExcludeEndpoint()
//   @ApiExtraModels(CreateUserDto)
//   // @ApiResponse({
//   //   schema: {
//   //     '$ref': getSchemaPath(Auth)
//   //   }
//   // })
//   @Post()
//   async create(@Body() createUserDto: CreateUserDto): Promise<User> {
//     try {
//       let u = await this.usersService.create(createUserDto)
//       delete u.password;
//       return u;
//     } catch (error) {
//       throw new HttpException({
//         status: HttpStatus.FORBIDDEN,
//         error: error.message.includes('unique') ? 'Username and Email should be unique' : error.message,
//       }, HttpStatus.FORBIDDEN);
//     }
//   }
//   @ApiExcludeEndpoint()
//   @Get()
//   findAll(): Promise<User[]> {
//     return this.usersService.findAll();
//   }
//   @ApiExcludeEndpoint()
//   @Get(':id')
//   findOne(@Param('id') id: string): Promise<User> {
//     return this.usersService.findOne(id);
//   }
//   @ApiExcludeEndpoint()
//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.usersService.remove(id);
//   }



//   @ApiExcludeEndpoint()
//   @Post('file')
//   @UseInterceptors(FileInterceptor('file', {
//     storage: diskStorage({
//       destination: './uploads'
//       , filename: (req, file, cb) => {
//         const randomName = Date.now()
//         cb(null, `${randomName}${extname(file.originalname)}`)
//       }
//     })
//   }))

//   @ApiExcludeEndpoint()
//   uploadFile(
//     @Body() body: SampleDto,
//     @UploadedFile() file: Express.Multer.File,
//   ): Promise<User> {
//     return this.usersService.update({ id: body.id, profilePicture: file.filename });

//   }

//   // @ApiExtraModels(Authorization)
//   // @UseGuards(JwtAuthGuard)

// }



import {
  Controller, HttpException,
  HttpStatus, Get, Request, Post, UseGuards, Body, Headers, Patch
} from '@nestjs/common';
import { Auth, Authorization } from '../auth/dto/user-login.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from './entity/users.entity';
import { UserId } from 'src/shared/user-id.decorator';


@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  find(@UserId('userId') userId: string): Promise<any> {
    return this.usersService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() body: any, @UserId('userId') userId: string) {
    const {firstName, lastName} = body;
    return this.usersService.update({firstName, lastName},userId );
  }
}