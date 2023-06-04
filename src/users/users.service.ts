import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: any) {
    try {
     return await this.usersRepository.save(createUserDto)
    } catch (error) {
      return error;
    }

  }

  async findUserWithEmail(email: string) {
    return this.usersRepository.findOne( {where: {
      email
    }});
  }

  
  async update(body, userId): Promise<User> {
    try {
      await this.usersRepository
    .createQueryBuilder()
    .update(User)
    .set(body)
    .where({id: userId})
    .execute();
      let updatedUser = await this.usersRepository.findOneBy({ id: userId})
      return updatedUser;
    } catch (error) {
      return error;
    }

  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }
  async verifyUser(email: string, password: string): Promise<User> {
    try {
      let v=await this.usersRepository.createQueryBuilder()
      .select('*')
      .where('email = :email', { email: email })
      .getRawOne();
    
      const isMatch = await bcrypt.compare(password, v.password);
  
      if(isMatch){
        delete v.password;
        return v;
      }else{
        return null;
      }
    } catch (error) {
      return null;
    }
  
    // return this.usersRepository.findOneBy({ username: username, password: password });
  }

  
}