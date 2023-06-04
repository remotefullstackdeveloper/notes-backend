import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ type: 'string', example: 'string' })
  fullName: string;
  @ApiProperty({ type: 'string', example: 'string' })
  username: string;
  @ApiProperty({ type: 'string', example: 'string' })
  email: string;
 
  @ApiProperty({ type: 'string', example: 'string' })
  status: string;
  
  @ApiProperty({ type: 'string', example: 'string' })
  password: string;
  
  @ApiProperty({
    type: 'string',
   
})
role: string;
}


export class SampleDto {
  name: string;
  id:string;
}
