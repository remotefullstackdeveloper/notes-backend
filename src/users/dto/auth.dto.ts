import { ApiProperty } from '@nestjs/swagger';

export class Authorization {
    @ApiProperty({ type: 'string', example: '' })
    "Authorization": string;
}