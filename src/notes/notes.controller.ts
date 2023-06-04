import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,

  UseGuards,
  Request,
  Headers,
  HttpException,
  HttpStatus,
  Patch,
  ValidationPipe,
  Query
} from '@nestjs/common';

import {
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { UserId } from 'src/shared/user-id.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilterDto } from './dto/filter.dto';

@Controller('note')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }
 
 

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @UserId('userId') userId): Promise<any> {
    return this.notesService.findOne(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@UserId('userId') userId: string, @Query(ValidationPipe) filterDto: FilterDto ): Promise<any> {
    return this.notesService.findAllofUser(userId, filterDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: any, @UserId('userId') userId: string): Promise<any> {
    try {
      body.userId =userId;
      const u = await this.notesService.create(body)
      return u;
    } catch (error) {
     return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() createUserDto: any, @UserId('userId') userId: string) {
    return this.notesService.update(createUserDto,userId, id );
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @UserId('userId') userId: string): Promise<any> {
    try {
      await this.notesService.remove(id,userId);
      return { statusCode: HttpStatus.OK,  message: 'Successfuly Delete.' };
    } catch(error) {
      return error;
    }
  }

}

