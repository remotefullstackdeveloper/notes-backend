import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class SharedService {

  async generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async check(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}