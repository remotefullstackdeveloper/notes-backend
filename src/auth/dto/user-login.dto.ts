import { ApiProperty } from '@nestjs/swagger';

export class Auth {
    @ApiProperty({ type: 'string', example: 'string' })
    "username": string;
    @ApiProperty({ type: 'string', example: 'string' })
    "password": string;
}

export class Authorization {
    @ApiProperty({ type: 'string', example: '' })
    "Authorization": string;
}